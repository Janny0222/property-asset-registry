import { NextRequest, NextResponse } from "next/server";
import { writeFile, unlink } from "fs/promises";
import path from 'path'
import { UploadFileModel } from "@/models/UploadFileModel";
import { PermitModel } from "@/models/PermitModel";

// export async function POST(request: NextRequest) {
//     const formData = await request.formData()
//     const entityId = formData.get('entityId')

//     if (!entityId) {
//         return NextResponse.json({ error: 'Entity ID is required' }, { status: 400 });
//     }

//     const files = formData.getAll('files') as File[]
//     if (files.length === 0) {
//         return NextResponse.json({ error: 'No Files uploaded'}, { status: 400})
//     }

//     try {
//         const uploadedFiles = [];

//         for (const file of files) {
//             const bytes = await file.arrayBuffer();
//             const buffer = Buffer.from(bytes);

//             const filename = `${file.name}`
//             const filePath = path.join(process.cwd(), 'public/uploads', filename)

//             await writeFile(filePath, buffer);

//             const uploadFile = await UploadFileModel.create({
//                 filename,
//                 entityId: Number(entityId),
//             })

//             uploadedFiles.push(uploadFile)
//         }

//         return NextResponse.json({ mesage: 'Files uploaded successfully', files:uploadedFiles})
//     } catch (error) {
//         console.error(error);
//         return NextResponse.json({ error: 'Upload Failed'}, { status: 500})
//     }
// }

export async function POST(request: NextRequest) {
    const formData = await request.formData()
    const entityId = formData.get('entityId')

    // if (!entityId) {
    //     return NextResponse.json({ error: 'Entity ID is required' }, { status: 400 });
    // }

    const file = formData.get('file') as File;
    if (!file) {
        return NextResponse.json({ error: 'No Files uploaded'}, { status: 400})
    }

    try {

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const filename = `${file.name}`
        const filePath = path.join(process.cwd(), 'public/uploads', filename)

        // const existingFile = await UploadFileModel.findOne({ where: { entityId: Number(entityId) } });
        //     if (existingFile) {
        //     const oldFilePath = path.join(process.cwd(), 'public/uploads', existingFile.filename);
        //     try {
        //         await unlink(oldFilePath); // Delete the old file
        //     } catch (error) {
        //         console.error('Error deleting old file:', error);
        //     }
        //     await existingFile.destroy();
        // }

        await writeFile(filePath, buffer);

        const uploadFile = await PermitModel.update({
            filename
        }, {where: {id: entityId}})

        return NextResponse.json({ mesage: 'Files uploaded successfully', files: uploadFile})
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Upload Failed'}, { status: 500})
    }
}