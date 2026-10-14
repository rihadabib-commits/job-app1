import { NextResponse } from "next/server";
import clientPromise from "@/lib/dbConnect";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("jobportal");

    // 'users' কালেকশন থেকে যাদের রোল employer তাদের ডাটা ফেচ করা
    const companies = await db
      .collection("users")
      .find(
        { role: { $in: ["employer", "Employer"] } },
        { projection: { password: 0 } } // সিকিউরিটির জন্য পাসওয়ার্ড বাদ দেওয়া হয়েছে
      )
      .toArray();

    return NextResponse.json({ success: true, data: companies }, { status: 200 });
  } catch (error: any) {
    console.error("Fetch public companies error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch companies" },
      { status: 500 }
    );
  }
}