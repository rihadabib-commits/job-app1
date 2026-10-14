import { NextResponse } from "next/server";
import clientPromise from "@/lib/dbConnect";

// GET: অ্যাডমিন প্যানেলের জন্য সমস্ত জব ফেচ করা
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("jobportal");

    const jobs = await db
      .collection("jobs")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({ success: true, data: jobs }, { status: 200 });
  } catch (error: any) {
    console.error("Fetch all jobs error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch jobs" },
      { status: 500 }
    );
  }
}