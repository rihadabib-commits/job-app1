import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import clientPromise from "@/lib/dbConnect";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user }: { user: any }) {
      try {
        const client = await clientPromise;
        const db = client.db("jobportal");

        // চেক করা যাক ইউজার ডাটাবেজে আগে থেকেই আছে কি না
        const existingUser = await db.collection("users").findOne({ email: user.email });

        if (!existingUser) {
          // না থাকলে নতুন ইউজার হিসেবে সেভ করো (ডিফল্ট রোল 'applicant')
          await db.collection("users").insertOne({
            name: user.name,
            email: user.email,
            image: user.image,
            role: "applicant",
            createdAt: new Date(),
          });
        }
        return true;
      } catch (error) {
        console.error("Google Sign-In DB Error:", error);
        return false;
      }
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };