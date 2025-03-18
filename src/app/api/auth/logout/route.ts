import { NextResponse } from "next/server";
import { serialize } from "cookie";

export async function POST() {
    try {
        const accessTokenCooke = serialize("auth_token", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 0,
            path: "/",
        })

        const refreshTokenCookie = serialize("refresh_token", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 0,
            path: "/",
        })

        return NextResponse.json({ message: "Logout successful" }, { status: 200, headers: { "Set-Cookie": [accessTokenCooke, refreshTokenCookie].join(", ") } });
    } catch (error) {
        console.error("Error logging out:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}