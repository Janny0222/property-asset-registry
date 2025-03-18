import { NextResponse, NextRequest } from "next/server";
import { UserModel } from "@/models/UserModel";
import { hash } from "bcrypt";
import bcrypt from "bcrypt";
import { z } from "zod";

const userScheme = z.object({
    username: z.string().min(5),
    email: z.string().email(),
    password: z.string().min(8),
    fullName: z.string().min(1),
}).transform(async (data) => {
    const hashedPassword = await bcrypt.hash(data.password, 10)
    return {
        username: data.username, 
        email: data.email, 
        fullName: data.fullName, 
        password: hashedPassword}
});
export async function GET(request: NextRequest) {
    try {
        const users = await UserModel.findAll();
        return NextResponse.json({ users });
    } catch (error) {
        console.error("Unable to fetch users:", error);
        return NextResponse.json({ error: "Unable to fetch users" }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    
    try {
        const data = await request.json();
        const parseData = await userScheme.parseAsync(data);
        console.log(parseData);
        if (!parseData.username || !parseData.email || !parseData.password || !parseData.fullName) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }
        const newUser = await UserModel.create({
            username: parseData.username,
            email: parseData.email,
            password: parseData.password,
            fullName: parseData.fullName
        });

        return NextResponse.json({message: "User created successfully", data: newUser});
    } catch (error) {
        console.error("Unable to create user:", error);
        return NextResponse.json({ error: "Unable to create user" }, { status: 500 });
    }
}