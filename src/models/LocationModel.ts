import { DataTypes, Model } from "sequelize";
import { sequelize } from "@/lib/db";

class LocationModel extends Model {
    public id!: number;
    public name!: string;
    public createdAt!: Date;
    public updatedAt!: Date;
}

LocationModel.init({
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
    modelName: "Location",
    tableName: "locations",
    timestamps: true
});
console.log('LocationModal initialized');
export { LocationModel };