import { DataTypes, Model } from "sequelize";
import { sequelize } from "@/lib/db";
import { PermitModel } from "./PermitModel";

class UploadFileModel extends Model {
    public id!: number;
    public filename!: string;
    public entityId!: number;
    public createdAt!: Date;
}

UploadFileModel.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    filename: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    entityId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            key: 'id',
            model: PermitModel
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
    }
}, {
    sequelize,
    modelName: 'UploadFile',
    tableName: 'upload_files',
    timestamps: true
})

export { UploadFileModel }