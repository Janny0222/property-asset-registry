import { Sequelize } from "sequelize";
import { UserModel } from "@/models/UserModel";
import 'dotenv/config';

export const sequelize = new Sequelize(
    process.env.DB_DATABASE!,
    process.env.DB_USERNAME!,
    process.env.DB_PASSWORD || '',
    {
        dialect: "mysql",
        host: process.env.DB_HOST,
        logging: false,
});

export const syncDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
        await sequelize.sync({ alter: true, logging: console.log });
        console.log("Tables have been recreated successfully.");
    } catch (error) {
        console.error("Unablse to connect to the database:", error);
    }
};

