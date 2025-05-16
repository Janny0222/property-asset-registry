import { DataTypes, Model } from "sequelize";
import { sequelize } from "@/lib/db";
import { PermitModel } from "./PermitModel";

class PermitHistoryModel extends Model {
    public id!: number;
    public permit_id!: string;
    public government_agency!: number;
    public company_plant!: number;
    public permit_type!: string;
    public requirement!: string;
    public frequency!: string;
    public in_charge!: string;
    public contact_no!: string;
    public permit_no!: string;
    public permit_date!: string;
    public renewal!: string;
    public permit_conditions!: string;
    public recomendation!: string;
    public filename!: string;
    public createdAt!: Date;
    public updatedAt!: Date;
}

PermitHistoryModel.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    permit_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    government_agency: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    company_plant: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    permit_type: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    requirement: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    frequency: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    in_charge: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    contact_no: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    permit_no: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    permit_date: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    renewal: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    permit_conditions: {
        type: DataTypes.STRING,
        allowNull: true
    },
    recomendation: {
        type: DataTypes.STRING,
        allowNull: true
    },
    filename: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    sequelize,
    modelName: "PermitHistory",
    tableName: "permit_history",
    timestamps: true
});
console.log('PermitHistory Model initialized');
export { PermitHistoryModel };