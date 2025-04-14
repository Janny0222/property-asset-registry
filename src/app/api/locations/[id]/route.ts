import { NextRequest, NextResponse } from "next/server";
import { LocationModel } from "@/models/LocationModel";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const propertyId = Number(resolvedParams.id);
  if (isNaN(propertyId)) {
    return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
  }

  try {
    const specificLocation = await LocationModel.findOne({ where: { id: propertyId } });

    if (!specificLocation) {
      return NextResponse.json({ error: "Location not found" }, { status: 404 });
    }

    return NextResponse.json(specificLocation);
  } catch (error) {
    console.error("Unable to fetch location:", error);
    return NextResponse.json({ error: "Unable to fetch location" }, { status: 500 });
  }
}

