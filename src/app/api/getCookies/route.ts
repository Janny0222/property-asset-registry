import { NextResponse } from "next/server";
import { cookies } from 'next/headers'

export async function GET() {
    const cookieStore = await cookies()
    const myCookie = cookieStore.get('auth_token')?.value

    return NextResponse.json({cookie: myCookie})
}