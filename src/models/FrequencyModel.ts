import { DataTypes, Model } from "sequelize";
import { sequelize } from "@/lib/db";

class FrequencyModel extends Model {
    public id!: number;
    public name_of_frequency!: string;
    public range_in_months!: string;
    public createdAt!: Date;
    public updatedAt!: Date;
}

FrequencyModel.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name_of_frequency: {
        type: DataTypes.STRING,
        allowNull: false
    },
    range_in_months: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
}, {
    sequelize,
    modelName: "Frequency",
    tableName: "frequency",
    timestamps: true
});
console.log('Frequency Model initialized');
export { FrequencyModel };