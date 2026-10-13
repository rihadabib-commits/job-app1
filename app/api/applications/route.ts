// import { NextResponse } from "next/server";
// import clientPromise from "@/lib/dbConnect";
// import { ObjectId } from "mongodb";

// // GET: সব অ্যাপ্লিকেশন ডাটা এবং তাদের সম্পর্কিত Job Details ফেচ করা
// export async function GET(req: Request) {
//   try {
//     const client = await clientPromise;
//     const db = client.db("jobportal");

//     // Aggregation pipeline to join applications with jobs collection
//     const applications = await db
//       .collection("applications")
//       .aggregate([
//         {
//           $addFields: {
//             // Convert string jobId to ObjectId if needed
//             jobObjectId: {
//               $cond: {
//                 if: { $regexMatch: { input: "$jobId", regex: /^[0-9a-fA-F]{24}$/ } },
//                 then: { $toObjectId: "$jobId" },
//                 else: "$jobId"
//               }
//             }
//           }
//         },
//         {
//           $lookup: {
//             from: "jobs",
//             localField: "jobObjectId",
//             foreignField: "_id",
//             as: "jobDetails"
//           }
//         },
//         {
//           $unwind: {
//             path: "$jobDetails",
//             preserveNullAndEmptyArrays: true
//           }
//         },
//         { $sort: { createdAt: -1 } }
//       ])
//       .toArray();

//     return NextResponse.json(
//       { success: true, data: applications },
//       { status: 200 }
//     );
//   } catch (error: any) {
//     console.error("Fetch Applications Error:", error);
//     return NextResponse.json(
//       { success: false, error: error.message || "Failed to fetch applications" },
//       { status: 500 }
//     );
//   }
// }

// // POST: নতুন অ্যাপ্লিকেশন সাবমিট করা
// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     const client = await clientPromise;
//     const db = client.db("jobportal");

//     const result = await db.collection("applications").insertOne({
//       ...body,
//       createdAt: new Date(),
//     });

//     return NextResponse.json(
//       { success: true, message: "Application submitted successfully", data: result },
//       { status: 201 }
//     );
//   } catch (error: any) {
//     console.error("Application Submit Error:", error);
//     return NextResponse.json(
//       { success: false, error: error.message || "Failed to submit application" },
//       { status: 500 }
//     );
//   }
// }



import { NextResponse } from "next/server";
import clientPromise from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

// GET: সব অ্যাপ্লিকেশন ডাটা এবং তাদের সম্পর্কিত Job Details ফেচ করা
export async function GET(req: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("jobportal");

    const applications = await db
      .collection("applications")
      .aggregate([
        {
          $addFields: {
            jobObjectId: {
              $cond: {
                if: {
                  $and: [
                    { $ne: ["$jobId", null] },
                    { $regexMatch: { input: {$toString: "$jobId" }, regex: /^[0-9a-fA-F]{24}$/ } }
                  ]
                },
                then: { $toObjectId: "$jobId" },
                else: "$jobId"
              }
            }
          }
        },
        {
          $lookup: {
            from: "jobs",
            localField: "jobObjectId",
            foreignField: "_id",
            as: "jobDetails"
          }
        },
        {
          $unwind: {
            path: "$jobDetails",
            preserveNullAndEmptyArrays: true
          }
        },
        { $sort: { createdAt: -1 } }
      ])
      .toArray();

    return NextResponse.json(
      { success: true, data: applications },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Fetch Applications Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch applications" },
      { status: 500 }
    );
  }
}

// POST: নতুন অ্যাপ্লিকেশন এবং ফাইল আপলোড হ্যান্ডেল করা
export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const fullName = formData.get("fullName") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const jobId = formData.get("jobId") as string;
    const file = formData.get("resume") as File | null;
    const resumeLinkInput = formData.get("resumeLink") as string;

    let resumeLink = resumeLinkInput || "";

    // ফাইল বা সিভি থাকলে সেভ করার প্রসেস
    if (file && typeof file === "object" && "name" in file && file.size > 0) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const filename = `${Date.now()}-${file.name.replace(/\s+/g, "_")}`;
      const uploadDir = path.join(process.cwd(), "public/uploads");

      try {
        // ফোল্ডার না থাকলে অটোমেটিক তৈরি করে নেবে
        await mkdir(uploadDir, { recursive: true });
        await writeFile(path.join(uploadDir, filename), buffer);
        resumeLink = `/uploads/${filename}`;
      } catch (err) {
        console.error("File upload error:", err);
      }
    }

    const client = await clientPromise;
    const db = client.db("jobportal");

    const result = await db.collection("applications").insertOne({
      fullName,
      email,
      phone,
      jobId,
      resumeLink,
      status: "In Review",
      createdAt: new Date(),
    });

    return NextResponse.json(
      { success: true, message: "Application submitted successfully", data: result },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Application Submit Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to submit application" },
      { status: 500 }
    );
  }
}