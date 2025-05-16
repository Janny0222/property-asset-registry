import { FrequencyModel } from "@/models/FrequencyModel";
import { NextResponse, NextRequest } from "next/server";
import { z } from "zod";

const frequencyScheme = z.object({
    name_of_frequency: z.string().min(1),
    range_in_months: z.number().min(1),
}).transform(async (data) => {
    return {
        name_of_frequency: data.name_of_frequency,
        range_in_months: data.range_in_months,
    }
});

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();
        const parseData = await frequencyScheme.parseAsync(data);
        const newFrequency = await FrequencyModel.create({
            name_of_frequency: parseData.name_of_frequency,
            range_in_months: parseData.range_in_months,
        })
        if (!parseData.name_of_frequency || !parseData.range_in_months) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }
        return NextResponse.json({message: "Frequency created successfully", data: newFrequency});
    } catch (error) {
        console.error("Unable to create Frequency:", error);
        return NextResponse.json({ error: "Unable to create Frequency" }, { status: 500 });
    }
}

export async function GET(request: NextRequest) {
    
    try {
        const frequencyList = await FrequencyModel.findAll();
        return NextResponse.json( frequencyList );
    } catch (error) {
        console.error("Unable to fetch locations:", error);
        return NextResponse.json({ error: "Unable to fetch locations" }, { status: 500 });
    }
}

