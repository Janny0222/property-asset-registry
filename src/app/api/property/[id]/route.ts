import { NextResponse, NextRequest } from "next/server";
import { PropertyModel } from "@/models/PropertyModel";

export async function GET(request: NextRequest, {params} : { params: Promise<{ id: string }>}) {
    try {
        const resolvedParams = await params;
        const propertyId = Number(resolvedParams.id);
        
        const specificLocation = await PropertyModel.findOne({ where: {id: propertyId}});
        return NextResponse.json( specificLocation );
    } catch (error) {
        console.error("Unable to fetch property:", error);
        return NextResponse.json({ error: "Unable to fetch property" }, { status: 500 });
    }
}