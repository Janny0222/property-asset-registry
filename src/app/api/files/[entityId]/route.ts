import { NextRequest, NextResponse } from 'next/server';
import { UploadFileModel } from '@/models/UploadFileModel';

export async function GET(req: NextRequest, { params }: { params: Promise<{ entityId: string }> }) {
  try {
    const getParams = await params;
    const entity_id = getParams.entityId;
    const file = await UploadFileModel.findOne({
      where: { entityId: Number(entity_id) },
    });

    if (!file) {
      return NextResponse.json({ error: 'No file found' }, { status: 404 });
    }

    return NextResponse.json(file);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error fetching file' }, { status: 500 });
  }
}
