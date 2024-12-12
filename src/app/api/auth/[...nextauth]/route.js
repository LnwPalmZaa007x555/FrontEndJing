import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import userLogin from '@/lib/userlogin'

const jwtt = require('jsonwebtoken')

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {},
      async authorize(credentials) {
        try {
            const { email, password } = credentials;
            console.log(email+" "+password);
            const user = await userLogin(email, password);
            if (user && user.token) {
                console.log("entry to return user");
                return user;
            } else {
                return null;
            }
          } catch (error) {
            console.log("error is "+error);
          }
      },
    })
  ],

  session: {
    strategy: 'jwt',
  },
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,  // ชื่อของคุกกี้
      options: {
        httpOnly: true,  // ทำให้คุกกี้ไม่สามารถเข้าถึงจาก JavaScript
        sameSite: "lax",  // ตั้งค่า sameSite เพื่อช่วยในการจัดการ CORS
        path: "/",
        secure: process.env.NODE_ENV === "production",  // ตั้งค่าคุกกี้ให้เป็น secure เฉพาะใน production
      },
    },
  },

  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        const payload = jwtt.verify(user.token, process.env.JWT_SECRET);
        payload.token = user.token;
        token.user = payload;
      }
      console.log('token is')
      console.log(token)
      return token;
    },
    session: async ({ session, token }) => {
      if (token?.user) {
        session.user = token.user;
      }
      console.log('session is')
      console.log(session)
      return session;
    }
  },
  pages: {
    signIn: '/Auth/Login'
    }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }