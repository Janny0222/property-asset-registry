
import { DataTypes, Model } from "sequelize";
import { sequelize } from "@/lib/db";
import { LocationModel } from "./LocationModel";

class PropertyModel extends Model {
    public id!: number;
    public propertyNo!: number;
    public location!: number;
    public company_owner!: string | undefined;
    public address!: string;
    public createdAt!: Date;
    public updatedAt!: Date;
}

PropertyModel.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    propertyNo: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    location: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: LocationModel,
            key: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
    },
    company_owner: {
        type: DataTypes.STRING,
        allowNull: true
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    sequelize,
    modelName: "Property",
    tableName: "property",
    timestamps: true
})
console.log('Property Model initialized');
export {PropertyModel}