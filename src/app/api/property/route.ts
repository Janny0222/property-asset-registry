import { NextResponse, NextRequest } from "next/server";
import { PropertyModel } from "@/models/PropertyModel";
import { z } from "zod";

const propertyScheme = z.object({
    propertyNo: z.number().min(1),
    location: z.number().min(1),
    company_owner: z.string().min(4)
}).transform(async (data) => {
    return {
        propertyNo: data.propertyNo,
        location: data.location,
        company_owner: data.company_owner
    }
});

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();
        const parseData = await propertyScheme.parseAsync(data)

        const newProperty = await PropertyModel.create({
            propertyNo: parseData.propertyNo,
            location: parseData.location,
            company_owner: parseData.company_owner
        })
        return NextResponse.json({ message: "New Property Successfully Created", data: newProperty})
    } catch (error) {
        console.error("Unable to create property:", error);
        return NextResponse.json({ error: "Unable to create property" }, { status: 500 });
    }
}

export async function GET(request: NextRequest) {
    await PropertyModel.sync({alter: true});
    try {
        const property = await PropertyModel.findAll()
        return NextResponse.json(property)
    } catch (error) {
        console.error("Unable to fetch property:", error);
        return NextResponse.json({ error: "Unable to fetch property" }, { status: 500 });
    }
}