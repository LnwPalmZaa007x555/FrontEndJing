export { default } from "next-auth/middleware"
export const config = { 
    matcher:["/mybooking/:path*","/booking/:path*","/selectroom/:path*"]
}