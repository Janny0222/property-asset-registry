import { NextRequest, NextResponse } from "next/server";
import { CompanyPlantModel } from "@/models/CompanyPlant";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const companyPlantId = Number(resolvedParams.id);
  if (isNaN(companyPlantId)) {
    return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
  }

  try {
    const specificLocation = await CompanyPlantModel.findOne({ where: { id: companyPlantId } });

    if (!specificLocation) {
      return NextResponse.json({ error: "Company Plant not found" }, { status: 404 });
    }

    return NextResponse.json(specificLocation);
  } catch (error) {
    console.error("Unable to fetch permits:", error);
    return NextResponse.json({ error: "Unable to fetch company plant" }, { status: 500 });
  }
}

