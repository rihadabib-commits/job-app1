import { NextResponse } from "next/server";
import clientPromise from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const dynamic = "force-dynamic";

// GET: শুধু নিজের সেভ করা জব
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db("jobportal");

    const savedJobs = await db
      .collection("savedJobs")
      .find({ userEmail: session.user.email })
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({ success: true, data: savedJobs }, { status: 200 });
  } catch (error: any) {
    console.error("Fetch saved jobs error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch saved jobs" },
      { status: 500 }
    );
  }
}

// POST: জব সেভ করা
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const client = await clientPromise;
    const db = client.db("jobportal");

    if (body.jobId) {
      const exists = await db.collection("savedJobs").findOne({
        userEmail: session.user.email,
        jobId: body.jobId,
      });
      if (exists) {
        return NextResponse.json(
          { success: false, error: "Job already saved" },
          { status: 409 }
        );
      }
    }

    const result = await db.collection("savedJobs").insertOne({
      ...body,
      userEmail: session.user.email,
      createdAt: new Date(),
    });

    return NextResponse.json(
      { success: true, message: "Job saved successfully", data: result },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Save job error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to save job" },
      { status: 500 }
    );
  }
}