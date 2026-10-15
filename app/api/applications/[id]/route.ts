import { NextResponse } from "next/server";
import clientPromise from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// PUT: স্ট্যাটাস আপডেট (শুধু employer/admin)
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const role = (session.user as any).role;
    if (role !== "employer" && role !== "admin") {
      return NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 });
    }

    const { id } = await Promise.resolve(params);
    const { status } = await req.json();

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, error: "Invalid Application ID" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("jobportal");

    const result = await db
      .collection("applications")
      .updateOne({ _id: new ObjectId(id) }, { $set: { status } });

    if (result.matchedCount === 0) {
      return NextResponse.json({ success: false, error: "Application not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Status updated successfully" }, { status: 200 });
  } catch (error: any) {
    console.error("Update Status Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update status" },
      { status: 500 }
    );
  }
}

// DELETE: শুধু নিজের অ্যাপ্লিকেশন ডিলিট করা যাবে
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await Promise.resolve(params);

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, error: "Invalid Application ID" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("jobportal");

    const result = await db.collection("applications").deleteOne({
      _id: new ObjectId(id),
      userEmail: session.user.email,
    });

    if (result.deletedCount === 0) {
      return NextResponse.json({ success: false, error: "Application not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Application deleted successfully" }, { status: 200 });
  } catch (error: any) {
    console.error("Delete Application Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to delete application" },
      { status: 500 }
    );
  }
}