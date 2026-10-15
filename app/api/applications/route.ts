import { NextResponse } from "next/server";
import clientPromise from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export const dynamic = "force-dynamic";

// GET: শুধু লগইন করা ইউজারের নিজের অ্যাপ্লিকেশন
export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const role = (session.user as any).role;
    const { searchParams } = new URL(req.url);

    const canSeeAll =
      (role === "employer" || role === "admin") &&
      searchParams.get("scope") === "all";

    const query = canSeeAll ? {} : { userEmail: session.user.email };

    const client = await clientPromise;
    const db = client.db("jobportal");

    const applications = await db
      .collection("applications")
      .aggregate([
        { $match: query },
        {
          $addFields: {
            jobObjectId: {
              $cond: {
                if: {
                  $and: [
                    { $ne: ["$jobId", null] },
                    {
                      $regexMatch: {
                        input: { $toString: "$jobId" },
                        regex: /^[0-9a-fA-F]{24}$/,
                      },
                    },
                  ],
                },
                then: { $toObjectId: "$jobId" },
                else: "$jobId",
              },
            },
          },
        },
        {
          $lookup: {
            from: "jobs",
            localField: "jobObjectId",
            foreignField: "_id",
            as: "jobDetails",
          },
        },
        { $unwind: { path: "$jobDetails", preserveNullAndEmptyArrays: true } },
        { $sort: { createdAt: -1 } },
      ])
      .toArray();

    return NextResponse.json({ success: true, data: applications }, { status: 200 });
  } catch (error: any) {
    console.error("Fetch Applications Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch applications" },
      { status: 500 }
    );
  }
}

// POST: নতুন অ্যাপ্লিকেশন
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const formData = await req.formData();
    const fullName = formData.get("fullName") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const jobId = formData.get("jobId") as string;
    const file = formData.get("resume") as File | null;
    const resumeLinkInput = formData.get("resumeLink") as string;

    let resumeLink = resumeLinkInput || "";

    if (file && typeof file === "object" && "name" in file && file.size > 0) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const filename = `${Date.now()}-${file.name.replace(/\s+/g, "_")}`;
      const uploadDir = path.join(process.cwd(), "public/uploads");

      try {
        await mkdir(uploadDir, { recursive: true });
        await writeFile(path.join(uploadDir, filename), buffer);
        resumeLink = `/uploads/${filename}`;
      } catch (err) {
        console.error("File upload error:", err);
      }
    }

    const client = await clientPromise;
    const db = client.db("jobportal");

    const already = await db.collection("applications").findOne({
      userEmail: session.user.email,
      jobId,
    });
    if (already) {
      return NextResponse.json(
        { success: false, error: "You already applied for this job" },
        { status: 409 }
      );
    }

    const result = await db.collection("applications").insertOne({
      fullName,
      email,
      userEmail: session.user.email,
      userId: (session.user as any).id,
      phone,
      jobId,
      resumeLink,
      status: "In Review",
      createdAt: new Date(),
    });

    return NextResponse.json(
      { success: true, message: "Application submitted successfully", data: result },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Application Submit Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to submit application" },
      { status: 500 }
    );
  }
}