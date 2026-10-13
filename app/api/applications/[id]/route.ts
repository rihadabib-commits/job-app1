import { NextResponse } from "next/server";
import clientPromise from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    // Next.js version compatibility-r jonno params resolve koreawa
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