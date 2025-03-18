import { NextRequest, NextResponse } from "next/server";
import { GovernmentAgencyModel } from "@/models/GovernmentAgencyModel";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const permitId = Number(resolvedParams.id);
  console.log(typeof(permitId))
  if (isNaN(permitId)) {
    return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
  }

  try {
    const specificLocation = await GovernmentAgencyModel.findOne({ where: { id: permitId } });

    if (!specificLocation) {
      return NextResponse.json({ error: "Permit not found" }, { status: 404 });
    }

    return NextResponse.json(specificLocation);
  } catch (error) {
    console.error("Unable to fetch permits:", error);
    return NextResponse.json({ error: "Unable to fetch permit" }, { status: 500 });
  }
}

