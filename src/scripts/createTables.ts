import { UploadFileModel } from '@/models/UploadFileModel';
import { syncDatabase } from "@/lib/db";
import { UserModel } from "@/models/UserModel";
import { LocationModel } from "@/models/LocationModel";
import { PropertyModel } from "@/models/PropertyModel";
import { GovernmentAgencyModel } from "@/models/GovernmentAgencyModel";
import { CompanyPlantModel } from "@/models/CompanyPlant";
import { PermitModel } from "@/models/PermitModel";
const createTables = async () => {
    try {
        await syncDatabase();
        await UserModel.sync({alter: true});
        await LocationModel.sync({alter: true});
        await PropertyModel.sync({alter: true});
        await GovernmentAgencyModel.sync({alter: true});
        await CompanyPlantModel.sync({ alter: true });
        await PermitModel.sync({ alter: true });
        await UploadFileModel.sync({ alter: true})
        console.log("All models were synchronized successfully.");
        process.exit(0);
    } catch (error: any) {
        console.log("Unable to create table:", error?.message);
        process.exit(1);
    }
};

createTables();