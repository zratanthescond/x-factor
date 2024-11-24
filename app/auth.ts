import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import facebook from "next-auth/providers/facebook";
import twitter from "next-auth/providers/twitter";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { use } from "react";
/**
 * Takes a token, and returns a new token with updated
 * `accessToken` and `accessTokenExpires`. If an error occurs,
 * returns the old token and an error property
 */

const authOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if (credentials === null) return null;
        console.log("credentials", credentials);
        try {
          const response = await axios.post(
            `http://localhost:5000/api/Auth/login`,
            credentials,
            {
              headers: {
                "Content-Type": "application/json; charset=utf-8",
                Accept: "application/json",
                Authorization: "Bearer your-token",
              },
            }
          );
          if (response.status !== 200) return null;
          if (response.data.user) {
            const user = response.data.user;

            const token = response.data.token;
            console.log("user", user);
            user.token = token;
            if (!user) {
              return null;
            }
            return user;
          }
        } catch (e) {
          console.log("******************************************************");
          console.error(JSON.stringify(e));
          console.log("******************************************************");
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      console.log(user);
      if (user) {
        token.uid = user;
        token.token = user.token;
      }

      return token;
    },
    session: async ({ session, token }) => {
      // here we put session.useData and put inside it whatever you want to be in the session
      // here try to console.log(token) and see what it will have
      // sometimes the user get stored in token.uid.userData
      // sometimes the user data get stored in just token.uid
      console.log("token", token);
      token.uid.password = null;
      session.user = token.uid;
      session.token = token.uid.token;

      return session;
    },
  },

  secret: process.env.NEXT_AUTH_SECRET,
  database: process.env.DB_URL,
};

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);
