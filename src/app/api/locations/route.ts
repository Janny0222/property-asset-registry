import { NextResponse, NextRequest } from "next/server";
import { LocationModel } from "@/models/LocationModel";
import { z } from "zod";

const locationScheme = z.object({
    name: z.string().min(1),
}).transform(async (data) => {
    return {
        name: data.name,}
});

export async function POST(request: NextRequest) {    
    try {
        const data = await request.json();
        const parseData = await locationScheme.parseAsync(data);
        const newLocation = await LocationModel.create({
            name: parseData.name
        })
        if (!parseData.name) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }
        return NextResponse.json({message: "Location created successfully", data: newLocation});
    } catch (error) {
        console.error("Unable to create location:", error);
        return NextResponse.json({ error: "Unable to create location" }, { status: 500 });
    }
}

export async function GET(request: NextRequest) {
    try {
        const locations = await LocationModel.findAll();
        return NextResponse.json( locations );
    } catch (error) {
        console.error("Unable to fetch locations:", error);
        return NextResponse.json({ error: "Unable to fetch locations" }, { status: 500 });
    }
}

