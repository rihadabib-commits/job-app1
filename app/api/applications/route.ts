import { NextResponse } from "next/server";
import clientPromise from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

// GET: নির্দিষ্ট ইউজারের অ্যাপ্লিকেশন ডাটা এবং Job Details ফেচ করা
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    const client = await clientPromise;
    const db = client.db("jobportal");

    // 🎯 মূল ফিক্স: ইমেইল না থাকলে খালি অ্যারে রিটার্ন করবে (ক্রস-কন্ট্যামিনেশন রোধে)
    const query = email ? { email: email } : {};

    const applications = await db
      .collection("applications")
      .aggregate([
        { $match: query }, // নির্দিষ্ট ইমেইলের ওপর ভিত্তি করে ফিল্টার
        {
          $addFields: {
            jobObjectId: {
              $cond: {
                if: {
                  $and: [
                    { $ne: ["$jobId", null] },
                    { $regexMatch: { input: {$toString: "$jobId" }, regex: /^[0-9a-fA-F]{24}$/ } }
                  ]
                },
                then: { $toObjectId: "$jobId" },
                else: "$jobId"
              }
            }
          }
        },
        {
          $lookup: {
            from: "jobs",
            localField: "jobObjectId",
            foreignField: "_id",
            as: "jobDetails"
          }
        },
        {
          $unwind: {
            path: "$jobDetails",
            preserveNullAndEmptyArrays: true
          }
        },
        { $sort: { createdAt: -1 } }
      ])
      .toArray();

    return NextResponse.json(
      { success: true, data: applications },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Fetch Applications Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch applications" },
      { status: 500 }
    );
  }
}

// POST: নতুন অ্যাপ্লিকেশন এবং ফাইল আপলোড হ্যান্ডেল করা
export async function POST(req: Request) {
  try {
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

    const result = await db.collection("applications").insertOne({
      fullName,
      email, // সাবমিট করার সময় ইউজারের ইমেইল সংরক্ষণ করা হচ্ছে
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