import { CompanyPlantModel } from '@/models/CompanyPlant';
import { NextResponse, NextRequest } from "next/server";
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
        const newCompanyPlant = await CompanyPlantModel.create({
            name: parseData.name
        })
        if (!parseData.name) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }
        return NextResponse.json({message: "Government Permit created successfully", data: newCompanyPlant});
    } catch (error) {
        console.error("Unable to create Government Permit:", error);
        return NextResponse.json({ error: "Unable to create Government Permit" }, { status: 500 });
    }
}

export async function GET(request: NextRequest) {
    try {
        const companyPlantList = await CompanyPlantModel.findAll();
        return NextResponse.json( companyPlantList );
    } catch (error) {
        console.error("Unable to fetch locations:", error);
        return NextResponse.json({ error: "Unable to fetch locations" }, { status: 500 });
    }
}

