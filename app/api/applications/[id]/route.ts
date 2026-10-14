import { NextResponse } from "next/server";
import clientPromise from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

// PUT: অ্যাপ্লিকেশন স্ট্যাটাস আপডেট করার জন্য (Shortlisted, Rejected ইত্যাদি)
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const resolvedParams = await Promise.resolve(params);
    const id = resolvedParams.id;
    
    const body = await req.json();
    const { status } = body;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: "Invalid Application ID" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("jobportal");

    const result = await db.collection("applications").updateOne(
      { _id: new ObjectId(id) },
      { $set: { status: status } }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, error: "Application not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Status updated successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Update Status Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update status" },
      { status: 500 }
    );
  }
}

// DELETE: ক্যান্ডিডেট কর্তৃক অ্যাপ্লিকেশন উইথড্র বা ডিলিট করার জন্য
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const resolvedParams = await Promise.resolve(params);
    const id = resolvedParams.id;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: "Invalid Application ID" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("jobportal");

    const result = await db.collection("applications").deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, error: "Application not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Application deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Delete Application Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to delete application" },
      { status: 500 }
    );
  }
}