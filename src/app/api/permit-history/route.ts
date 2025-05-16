import { NextResponse, NextRequest } from "next/server";
import { PermitHistoryModel } from "@/models/PermitHistoryModel";
import { z } from "zod";

const permitHistoryScheme = z.object({
    permit_id: z.number().min(1),
    company_plant: z.number().min(1),
    government_agency: z.number().min(1),
    permit_type: z.string().min(1),
    requirement: z.string().min(1),
    in_charge: z.string().min(1),
    contact_no: z.string().min(1),
    permit_date: z.string().min(1),
    frequency: z.string().min(1),
    renewal: z.string().min(1),
    permit_no: z.string().min(1),
    filename: z.string(),
    permit_conditions: z.string().min(1),
    recomendation: z.string().min(1)
}).transform(async (data) => {
    return {
        permit_id: data.permit_id,
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
        filename: data.filename,
        permit_conditions: data.permit_conditions,
        recomendation: data.recomendation,
        }
    }
);

export async function POST(request: NextRequest) {
    try {
        const data = await request.json()
        const parseData = await permitHistoryScheme.parseAsync(data)

        const newPermitHistoryData = await PermitHistoryModel.create({
            permit_id: parseData.permit_id,
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
            filename: parseData.filename,
            permit_conditions: parseData.permit_conditions,
            recomendation: parseData.recomendation
        })

        return NextResponse.json({ message: "Permit History Data, Successfully Added", data: newPermitHistoryData}, {status: 200})
    } catch (error) {
        console.error("Unable to create Permit History Data", error)
        return NextResponse.json({ error: "Unable to create Permit History Data"}, { status: 500 })
    }
}

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const permit_id = searchParams.get("permit_id")

        // const allPermitHistoryList = await PermitHistoryModel.findAll({
        //     order: [["createdAt", "DESC"]],
        // });

        const permitHistory = await PermitHistoryModel.findAll({
            where: {
                permit_id: permit_id,
            },
            order: [["createdAt", "DESC"]],
        });

            return NextResponse.json(permitHistory)      

    } catch (error) {
        console.error("Unable to fetch Permit History List", error)
        return NextResponse.json({ error: "Unable to fetch Permit History List" }, {status: 400})
    }
}