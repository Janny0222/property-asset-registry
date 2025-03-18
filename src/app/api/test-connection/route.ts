import { NextResponse } from "next/server";
import { syncDatabase } from "@/lib/db";
import { UserModel } from "@/models/UserModel";

export async function GET() {
    try {
        await syncDatabase();
        await UserModel.sync()
        return NextResponse.json({ message: "Connection has been established successfully" });
    } catch (error) {
        console.error("Unable to connect to the database:", error);
        return NextResponse.json({ error: "Unable to connect to the database" }, { status: 500 });
    }
}
