import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import connectToDatabase from "@/lib/mongodb";
import { User } from "@/models/User";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          throw new Error("Invalid credentials");
        }
        await connectToDatabase();
        const user = await User.findOne({ username: credentials.username });
        if (!user) {
          throw new Error("No user found");
        }
        const isValid = await bcrypt.compare(credentials.password, user.password!);
        if (!isValid) {
          throw new Error("Invalid password");
        }
        return {
          id: user._id.toString(),
          name: user.username,
          role: user.role
        };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (token) {
        session.user = {
          ...session.user,
          role: token.role,
          id: token.id
        };
      }
      return session;
    }
  },
  session: {
    strategy: "jwt" as const,
    maxAge: 60 * 60, // 1 hour
  },
  pages: {
    signIn: '/login', // Adjust if you have a custom login page
  },
  secret: process.env.NEXTAUTH_SECRET,
};
