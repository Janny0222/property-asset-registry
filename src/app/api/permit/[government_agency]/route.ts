import { NextResponse, NextRequest } from "next/server";
import { PermitModel } from "@/models/PermitModel";

export async function GET(request: NextRequest, {params}: { params: Promise<{ government_agency: string }>}) {
    try {
        const getParams = await params;
        const gov_agency_id = getParams.government_agency;
        const permitList = await PermitModel.findAll({where: {government_agency: gov_agency_id}});
        return NextResponse.json(permitList)
    } catch (error) {
        console.error("Unable to fetch Permit List", error)
        return NextResponse.json({ error: "Unable to fetch Permit List" }, {status: 400})
    }
}