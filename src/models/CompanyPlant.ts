import { DataTypes, Model } from "sequelize";
import { sequelize } from "@/lib/db";

class CompanyPlantModel extends Model {
    public id!: number;
    public name!: string;
    public createdAt!: Date;
    public updatedAt!: Date;
}

CompanyPlantModel.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: "CompanyPlant",
    tableName: "company_plant",
    timestamps: true
});
console.log('GovernmentPermit initialized');
export { CompanyPlantModel };