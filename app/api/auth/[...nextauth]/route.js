import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import User from "@models/user";
import { connectToDB } from "@utils/database";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      try {
        const sessionUser = await User.findOne({ email: session.user.email });
        if (sessionUser) {
          session.user.id = sessionUser._id.toString();
        }
        return session;
      } catch (error) {
        console.error("Session callback error", error);
        return session;
      }
    },
    async signIn({ profile }) {
      try {
        await connectToDB();

        // Check if user exists in the database
        const userExists = await User.findOne({ email: profile.email });

        //  if not create a new user
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(/\s/g, "").toLowerCase(),
            image: profile.picture,
          });
        }

        return true;
      } catch (error) {
        console.error("Session callback error", error);
        return session;
      }
    }
  },
});

export { handler as GET, handler as POST };