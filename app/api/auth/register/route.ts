import { NextResponse } from "next/server";
import clientPromise from "@/lib/dbConnect";
import bcrypt from "bcryptjs"; // পাসওয়ার্ড হ্যাশ করার জন্য (টার্মিনালে npm i bcryptjs করে নিও)

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password, role } = body;

    if (!name || !email || !password || !role) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("jobportal");

    // চেক করা ইউজার ইতিমধ্যে আছে কি না
    const existingUser = await db.collection("users").findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 400 }
      );
    }

    // পাসওয়ার্ড সিকিউর বা এনক্রিপ্ট করা
    const hashedPassword = await bcrypt.hash(password, 10);

    // ডাটাবেজে ইউজার ইনসার্ট করা
    const result = await db.collection("users").insertOne({
      name,
      email,
      password: hashedPassword,
      role, // applicant, employer, বা admin
      createdAt: new Date(),
    });

    return NextResponse.json(
      { success: true, message: "User registered successfully", userId: result.insertedId },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Register Error:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}