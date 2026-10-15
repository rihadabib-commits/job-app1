import { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import clientPromise from "@/lib/dbConnect";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const client = await clientPromise;
        const db = client.db("jobportal");

        const user = await db
          .collection("users")
          .findOne({ email: credentials.email });

        if (!user || !user.password) return null;

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) return null;

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          image: user.image || null,
          role: user.role,
        } as any;
      },
    }),
  ],

  session: { strategy: "jwt" },

  pages: {
    signIn: "/login",
    error: "/login",
  },

  callbacks: {
    async signIn({ user, account }: { user: any; account: any }) {
      if (account?.provider !== "google") return true;

      try {
        const client = await clientPromise;
        const db = client.db("jobportal");

        const existingUser = await db
          .collection("users")
          .findOne({ email: user.email });

        if (!existingUser) {
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

    async jwt({ token, user, account }: { token: any; user?: any; account?: any }) {
      if (user) {
        if (account?.provider === "google") {
          const client = await clientPromise;
          const db = client.db("jobportal");
          const dbUser = await db
            .collection("users")
            .findOne({ email: user.email });
          token.id = dbUser?._id.toString();
          token.role = dbUser?.role || "applicant";
        } else {
          token.id = user.id;
          token.role = user.role;
        }
      }
      return token;
    },

    async session({ session, token }: { session: any; token: any }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};