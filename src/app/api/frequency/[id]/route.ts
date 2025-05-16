import { FrequencyModel } from "@/models/FrequencyModel";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest , { params }: { params: Promise<{ id: string }> }) {
    const  {id}  = await params;
    try {
        const frequency = await FrequencyModel.findOne({
            where: {
                id: id,
            },
        });
        if (!frequency) {
            return NextResponse.json({ error: "Frequency not found" }, { status: 404 });
        }
        return NextResponse.json(frequency);
    } catch (error) {
        console.error("Unable to fetch locations:", error);
        return NextResponse.json({ error: "Unable to fetch locations" }, { status: 500 });
    }
}