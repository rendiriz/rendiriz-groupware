import NextAuth from 'next-auth';
import type { NextAuthOptions } from 'next-auth';
import GitlabProvider from 'next-auth/providers/gitlab';

import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '@/lib/prisma';
import jwt from 'jsonwebtoken';

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  // session: {
  //   jwt: true,
  // },
  // jwt: {
  //   secret: process.env.NEXTAUTH_SECRET_JWT,
  //   async encode({ secret, token }) {
  //     return jwt.sign(token, secret);
  //   },
  //   async decode({ secret, token }) {
  //     return jwt.verify(token, secret);
  //   },
  // },
  callbacks: {
    async jwt({ token, account }) {
      console.log(account?.access_token);
      console.log(token);
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
      // const result = { ...token, accessToken: account?.accessToken };
      // console.log(result);
      // return Promise.resolve(result);
    },
    async session({ session, token, user }) {
      console.log(session);
      console.log(token);
      // console.log('USER : ', user);
      if (session.user) {
        session.user.id = user.id;
        session.user.role = user.role as string;
        session.accessToken = token?.accessToken;
      }
      return session;
    },
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    GitlabProvider({
      clientId: process.env.GITLAB_CLIENT_ID || '',
      clientSecret: process.env.GITLAB_CLIENT_SECRET || '',
    }),
  ],
};

export default NextAuth(authOptions);
