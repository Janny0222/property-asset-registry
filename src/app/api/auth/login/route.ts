import { NextResponse, NextRequest } from "next/server";
import { UserModel } from "@/models/UserModel";
import bcrypt from "bcrypt";
import { sign, verify } from "jsonwebtoken";
import { serialize } from "cookie";
import moment, { now } from 'moment-timezone'
import 'dotenv/config';

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();
        const { username, password } = data;
        const nowInPHT = moment.tz('Asia/Manila')
        const expiresInPHT = nowInPHT.add(120, 'minutes');
        const expiresInnUTC = expiresInPHT.utc().unix();
        console.log("Now In PHT: ", expiresInPHT)
        const user = await UserModel.findOne({ where: { username } });
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 }); // User not found
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json({ error: "Invalid password" }, { status: 401 }); // Invalid password
        }
        const maxAgeInSeconds = expiresInPHT.diff(moment(), "seconds");
        const accessToken = sign({ id: user.id, username: user.username, fullName: user.fullName }, process.env.JWT_SECRET as string, { expiresIn: expiresInnUTC });
        console.log(accessToken)
        const refreshToken = sign({ id: user.id, username: user.username, fullName: user.fullName }, process.env.REFRESH_TOKEN_SECRET as string, { expiresIn: "7d" });

        const accessTokenCookie = serialize("auth_token", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production" ? true : false,
            sameSite: "strict",
            maxAge: 604800,
            path: "/",
        });

        const refreshTokenCookie = serialize("refresh_token", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 604800,
            path: "/",
        });

        return NextResponse.json({ message: "Login successful", accessToken, refreshToken }, {
            status: 200,
            headers: {
                "Set-Cookie": [accessTokenCookie, refreshTokenCookie].join(", "),
            },
        });
    } catch (error) {
        console.error("Invalid Credentials", error);
        return NextResponse.json({ error: "Error logging in" }, { status: 500 });
    }
}

export async function GET(request: NextRequest) {
    const token = request.cookies.get("auth_token")?.value;
    if(!token) {
        return NextResponse.json({error: "Unauthorized"}, {status: 401})
    }

    try {
        const decoded = verify(token, process.env.JWT_SECRET as string);
        return NextResponse.json(decoded, { status: 200});
    } catch (error) {
        console.error("Invalid token", error);
        return NextResponse.json({error: "Invalid Token"}, {status: 401})
    }
}