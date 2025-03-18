
import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import {UserModel} from "@/models/UserModel";
import { serialize } from "cookie";

const generateAccessToken = (user: any) => {
    return jwt.sign(user, process.env.JWT_SECRET as string, { expiresIn: "1h" });
};

export async function POST(request: NextRequest) {
    try {
        const refreshToken = await request.json();
        const { token } = refreshToken
        console.log("Refresh Token From API: ",  refreshToken) 
        if (!refreshToken) {
            return NextResponse.json({ error: "Refresh Token not Found" }, { status: 401 });
        }

        const decoded = jwt.verify(refreshToken.refreshToken, process.env.REFRESH_TOKEN_SECRET as string);
        if (!decoded) {
            return NextResponse.json({ error: "Invalid refresh token" }, { status: 403 });
        }

        const user = await UserModel.findOne({ where: { id: (decoded as any).id } });
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const accessToken = generateAccessToken({ id: user.id, username: user.username, fullName: user.fullName });
        const newRefreshToken = jwt.sign({ id: user.id, username: user.username }, process.env.REFRESH_TOKEN_SECRET as string, { expiresIn: "7d" });

        const refreshTokenCookie = serialize("refresh_token", newRefreshToken, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", maxAge: 604800, path: "/" });

        const accessTokenCookie = serialize("auth_token", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production" ? true : false,
            sameSite: "strict",
            maxAge: 120,
            path: "/",
        })
        return NextResponse.json({ message: "Token Refreshed", accessToken }, { status: 200, headers: { "Set-Cookie": [accessTokenCookie, refreshTokenCookie].join(", ") } });
    } catch (error: any) {
        console.error("Error generating access token:", error.message);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    } finally {
        await UserModel.sequelize?.close();
    }
}