import { NextResponse, NextRequest } from "next/server";
import { PermitModel } from "@/models/PermitModel";
import { Op } from "sequelize";

export async function GET(request: NextRequest) {
    try {
        const today = new Date();
        const sixMonthsFromNow = new Date();
        sixMonthsFromNow.setMonth(today.getMonth() + 6);

        const permitData = await PermitModel.findAll({
            where: {
                renewal: {
                    [Op.ne]: "",
                    [Op.lte]: sixMonthsFromNow,
                }
            }
        });

        return NextResponse.json(permitData);
    } catch (error) {
        console.error("Unable to fetch Permit List", error);
        return NextResponse.json({ error: "Unable to fetch Permit List" }, { status: 400 });
    }
}
