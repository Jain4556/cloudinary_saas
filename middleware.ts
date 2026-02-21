import { auth, clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { url } from 'inspector';

import { NextResponse } from 'next/server';


const isPublicRoute = createRouteMatcher([
    "/sign-in",
    "/sign-up",
    "/",
    "/home"
])

const isPublicApiRoute = createRouteMatcher([
    "/api/vidoes"
])




export default clerkMiddleware((auth, req) => {
    const {userId} = auth();
    const currentUrl = new URL(req.url)

    const isAccessingDashboard = currentUrl.pathname === "/home"
    const isApiRequest = currentUrl.pathname.startsWith("/api")


    if (userId && isPublicRoute(req) && !isAccessingDashboard) {
        return NextResponse.redirect(new URL("/home", req.url))
    }

    // not loggeddIn
    if (!userId) {
        if (!isPublicRoute(req) && !isPublicApiRoute(req) ) {
                return NextResponse.redirect(new URL("/signin", req.url))
        }
        if (isApiRequest && !isPublicApiRoute(req)) {
            return NextResponse.redirect(new URL("/signin", req.url))
        }
        
    }

    return NextResponse.next()

    
})

export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"]
}