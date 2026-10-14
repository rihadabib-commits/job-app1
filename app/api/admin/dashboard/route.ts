import { NextResponse } from "next/server";
import clientPromise from "@/lib/dbConnect";

export async function GET(req: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("jobportal");

    // মোট ইউজার, এমপ্লয়ার এবং জব কাউন্ট করা
    const totalUsers = await db.collection("users").countDocuments();
    const activeEmployers = await db.collection("users").countDocuments({ role: "employer" });
    const totalJobs = await db.collection("jobs").countDocuments({ isApproved: true });

    // যে জবগুলো এখনো অ্যাপ্রুভ হয়নি (Pending)
    const pendingJobs = await db
      .collection("jobs")
      .find({ isApproved: { $ne: true } })
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json(
      {
        success: true,
        stats: {
          totalUsers: totalUsers.toString(),
          activeEmployers: activeEmployers.toString(),
          totalJobs: totalJobs.toString(),
          pendingApprovals: pendingJobs.length.toString(),
        },
        pendingJobs,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Admin Dashboard Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}