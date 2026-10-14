// app/api/jobs/route.ts
import { NextResponse } from "next/server";
import clientPromise from "@/lib/dbConnect";

// POST: নতুন জব পোস্ট করা (পেন্ডিং স্ট্যাটাস ও isApproved: false সহ)
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const client = await clientPromise;
    const db = client.db("jobportal");

    const result = await db.collection("jobs").insertOne({
      ...body,
      isApproved: false, // অ্যাডমিন অ্যাপ্রুভ করার আগে ফলস থাকবে
      status: "pending",   // পেন্ডিং স্ট্যাটাস থাকবে
      createdAt: new Date(),
    });

    return NextResponse.json(
      { success: true, message: "Job submitted for admin approval", data: result },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("MongoDB Connection Error Detail:", error.message || error);
    return NextResponse.json(
      { error: error.message || "Failed to post job" },
      { status: 500 }
    );
  }
}

// GET: শুধু অ্যাপ্রুভড জবগুলো পাবলিক জব লিস্টে দেখানোর জন্য
export async function GET(req: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("jobportal");

    // ইউজার বা কینڈিডেটরা শুধু তারাই দেখবে যাদের isApproved true বা status active
    const jobs = await db
      .collection("jobs")
      .find({ 
        $or: [
          { isApproved: true }, 
          { status: "active" }
        ] 
      })
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