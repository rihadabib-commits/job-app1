import { NextResponse } from "next/server";
import clientPromise from "@/lib/dbConnect";

// GET: সব সেভ করা জব ফেচ করা
export async function GET(req: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("jobportal");

    const savedJobs = await db
      .collection("savedJobs")
      .find({})
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

// POST: নতুন জব সেভ বা বুকমার্ক করার জন্য
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const client = await clientPromise;
    const db = client.db("jobportal");

    const result = await db.collection("savedJobs").insertOne({
      ...body,
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