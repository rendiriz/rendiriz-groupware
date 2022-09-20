import { DefaultSession } from 'next-auth';
// import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      role: string;
      accessToken: string;
    } & DefaultSession['user'];
  }

  interface Account {
    account: DefaultSession['account'];
  }
}

// declare module 'next-auth/jwt' {
//   interface JWT {
//     idToken?: string;
//   }
// }
