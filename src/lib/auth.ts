import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

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
        
        try {
          const res = await fetch(`${API_URL}/api/auth/login`, {
            method: 'POST',
            body: JSON.stringify({
              username: credentials.username,
              password: credentials.password,
            }),
            headers: { "Content-Type": "application/json" }
          });
          
          const data = await res.json();
          
          if (!res.ok) {
            throw new Error(data.message || "Invalid credentials");
          }
          
          if (data.user && data.token) {
            return {
              id: data.user.id,
              name: data.user.username,
              role: data.user.role,
              token: data.token
            };
          }
          
          return null;
        } catch (error: any) {
          throw new Error(error.message);
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
        token.apiToken = user.token; // Store Express API token
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
        (session as any).apiToken = token.apiToken; // Make token available to client
      }
      return session;
    }
  },
  session: {
    strategy: "jwt" as const,
    maxAge: 60 * 60, // 1 hour
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
};
