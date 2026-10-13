
// app/api/jobs/route.ts
import { NextResponse } from "next/server";
import clientPromise from "@/lib/dbConnect";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const client = await clientPromise;
    const db = client.db("jobportal");

    const result = await db.collection("jobs").insertOne({
      ...body,
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true, data: result }, { status: 201 });
  } catch (error: any) {
    console.error("MongoDB Connection Error Detail:", error.message || error);
    return NextResponse.json(
      { error: error.message || "Failed to post job" },
      { status: 500 }
    );
  }
}

// Job list fetch করার জন্য GET মেথড (data প্রপার্টি সহ)
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("jobportal");

    const jobs = await db
      .collection("jobs")
      .find({})
      .sort({ createdAt: -1 }) // নতুন জব আগে দেখাবে
      .limit(50)
      .toArray();

    return NextResponse.json({ success: true, data: jobs }, { status: 200 });
  } catch (error: any) {
    console.error("MongoDB Fetch Error:", error.message || error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch jobs" },
      { status: 500 }
    );
  }
}