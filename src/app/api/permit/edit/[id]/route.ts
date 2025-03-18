import { NextResponse, NextRequest } from "next/server";
import { PermitModel } from "@/models/PermitModel";
import { z } from "zod";

const permitScheme = z.object({
    company_plant: z.number().min(0),
    government_agency: z.number().min(0),
    permit_type: z.string().min(0),
    requirement: z.string().min(0),
    in_charge: z.string().min(0),
    contact_no: z.string().min(0),
    permit_date: z.string().min(0),
    frequency: z.string().min(0),
    renewal: z.string().min(0),
    permit_no: z.string().min(0),
    permit_conditions: z.string().min(0),
    recomendation: z.string().min(0)
}).transform(async (data) => {
    return {
        company_plant: data.company_plant,
        government_agency: data.government_agency,
        permit_type: data.permit_type,
        requirement: data.requirement,
        in_charge: data.in_charge,
        contact_no: data.contact_no,
        permit_date: data.permit_date,
        frequency: data.frequency,
        renewal: data.renewal,
        permit_no: data.permit_no,
        permit_conditions: data.permit_conditions,
        recomendation: data.recomendation,
    }
});

export async function PUT(request: NextRequest, {params}: { params: Promise<{ id: string }>}) {
    try {
        const getParams = await params;
        const permitId = Number(getParams.id);
        const data = await request.json()
        const parseData = await permitScheme.parseAsync(data)

        const updatePermit = await PermitModel.update({
            company_plant: parseData.company_plant,
            government_agency: parseData.government_agency,
            permit_type: parseData.permit_type,
            requirement: parseData.requirement,
            frequency: parseData.frequency,
            in_charge: parseData.in_charge,
            contact_no: parseData.contact_no,
            permit_no: parseData.permit_no,
            permit_date: parseData.permit_date,
            renewal: parseData.renewal,
            permit_conditions: parseData.permit_conditions,
            recomendation: parseData.recomendation
        }, {
            where: {id: permitId}
        })

        return NextResponse.json({ message: "Permit Data, Successfully Updated", data: updatePermit}, {status: 201})
    } catch (error) {
        console.error("Unable to update Permit Data", error)
        return NextResponse.json({ error: "Unable to update Permit Data"}, { status: 500 })
    }
}

export async function GET(request: NextRequest, {params}: { params: Promise<{ id: string }>}) {
    try {
        const getParams = await params;
        const permitId = Number(getParams.id);
        const permitData = await PermitModel.findOne({where: {id: permitId}});
        return NextResponse.json(permitData)
    } catch (error) {
        console.error("Unable to fetch Permit List", error)
        return NextResponse.json({ error: "Unable to fetch Permit List" }, {status: 400})
    }
}