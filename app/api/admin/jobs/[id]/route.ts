import { NextResponse } from "next/server";
import clientPromise from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

// PUT: জব অ্যাপ্রুভ করা
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const resolvedParams = await Promise.resolve(params);
    const id = resolvedParams.id;
    
    // বডি রিড করার সময় ফেইল করলে ক্র্যাশ করবে না
    let body: any = {};
    try {
      body = await req.json();
    } catch (e) {
      // Body empty বা invalid JSON হলে ইগ্নোর করবে
    }

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, error: "Invalid Job ID" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("jobportal");

    // action === "approve" অথবা বডি না থাকলেও সরাসরি জব অ্যাপ্রুভ করে দেবে
    if (!body.action || body.action === "approve") {
      const result = await db.collection("jobs").updateOne(
        { _id: new ObjectId(id) },
        { $set: { isApproved: true, status: "active" } }
      );

      if (result.matchedCount === 0) {
        return NextResponse.json({ success: false, error: "Job not found" }, { status: 404 });
      }

      return NextResponse.json({ success: true, message: "Job approved successfully" }, { status: 200 });
    }

    return NextResponse.json({ success: false, error: "Invalid action" }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// DELETE: জব রিজেক্ট বা ডিলিট করা
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const resolvedParams = await Promise.resolve(params);
    const id = resolvedParams.id;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, error: "Invalid Job ID" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("jobportal");

    const result = await db.collection("jobs").deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ success: false, error: "Job not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Job rejected and removed" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}