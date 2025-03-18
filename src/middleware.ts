import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isTokenExpired } from "./utils/tokenUtils";
import axios from "axios";

const refreshAuthToken = async (request: NextRequest) => {
    const refreshToken = request?.cookies?.get("refresh_token")?.value;
    console.log("Refresh Token: ", refreshToken)
    if (!refreshToken) {
        console.log('Refresh token not found');
        return null;
    }
    
    try {
        const response = await fetch(`http://localhost:3000/api/auth/refresh`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refreshToken }),
            credentials: 'include',
            mode: 'cors',

        });
        console.log("RESPONSE:", response.ok)
        if (response.ok) {
            const data = await response.json();
            console.log('Refreshed token:', data.accessToken);
            return data.accessToken;
        } else {
            return null;
        }
    } catch (error: any) {
        console.error('Error refreshing token:', error.message);
        return null;
    }
}

export async function middleware(request: NextRequest) {
    const token = request?.cookies?.get("auth_token")?.value;
    const refresh_token = request?.cookies?.get("refresh_token")?.value
    const pathname = request.nextUrl.pathname;

    if (token) {
        if(pathname === "/login" || pathname === '/') {
            return NextResponse.redirect(new URL('/dashboard', request.url));
        }
    } 
        if (!token && pathname !== "/login") {
            return NextResponse.redirect(new URL('/login', request.url));
        }
        
    
       

    return NextResponse.next();
}

export const config = {
    matcher: ["/login","/dashboard", "/", "/dashboard/:path*", "/maintenance/:path*"],
}