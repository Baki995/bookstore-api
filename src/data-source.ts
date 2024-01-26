import dotenv from 'dotenv';
dotenv.config();

import { Book } from "./entities/Book";
import { DataSource } from "typeorm";
import * as process from "process";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [Book],
    synchronize: false,
    logging: false,
    migrations: ["src/migrations/*.ts"],
    migrationsTableName: "migrations"
});
