import { NextResponse } from "next/server";
import clientPromise from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

// DELETE: সেভ করা জব লিস্ট থেকে রিমুভ করা
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const resolvedParams = await Promise.resolve(params);
    const id = resolvedParams.id;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: "Invalid Saved Job ID" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("jobportal");

    const result = await db.collection("savedJobs").deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, error: "Saved job not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Job removed from saved list" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Delete saved job error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to remove job" },
      { status: 500 }
    );
  }
}