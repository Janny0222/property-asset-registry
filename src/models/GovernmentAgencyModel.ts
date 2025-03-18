import { DataTypes, Model } from "sequelize";
import { sequelize } from "@/lib/db";

class GovernmentAgencyModel extends Model {
    public id!: number;
    public name!: string;
    public createdAt!: Date;
    public updatedAt!: Date;
}

GovernmentAgencyModel.init({
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
    modelName: "GovernmentPermitList",
    tableName: "government_permit",
    timestamps: true
});
console.log('GovernmentPermit initialized');
export { GovernmentAgencyModel };