import { NextResponse } from "next/server";
import clientPromise from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import bcrypt from "bcryptjs";
import { ObjectId } from "mongodb";

// PUT: পাসওয়ার্ড বা নোটিফিকেশন সেটিংস আপডেট করা
export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { currentPassword, newPassword, notifications } = body;
    const client = await clientPromise;
    const db = client.db("jobportal");

    const user = await db.collection("users").findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
    }

    let updateData: any = {};

    // যদি নোটিফিকেশন প্রেফারেন্স আসে
    if (notifications) {
      updateData.notifications = notifications;
    }

    // যদি পাসওয়ার্ড পরিবর্তনের রিকোয়েস্ট আসে
    if (currentPassword && newPassword) {
      if (!user.password) {
        return NextResponse.json(
          { success: false, error: "Google authenticated accounts cannot change password here." },
          { status: 400 }
        );
      }

      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return NextResponse.json({ success: false, error: "Current password is incorrect" }, { status: 400 });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      updateData.password = hashedPassword;
    }

    await db.collection("users").updateOne({ email: session.user.email }, { $set: updateData });

    return NextResponse.json({ success: true, message: "Settings updated successfully" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || "Failed to update settings" }, { status: 500 });
  }
}

// DELETE: অ্যাকাউন্ট ডিলিট করা
export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db("jobportal");

    // ইউজারের ডাটা এবং তার অ্যাপ্লিকেশনগুলো ডিলিট করা
    await db.collection("users").deleteOne({ email: session.user.email });
    await db.collection("applications").deleteMany({ email: session.user.email });

    return NextResponse.json({ success: true, message: "Account deleted successfully" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || "Failed to delete account" }, { status: 500 });
  }
}