"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const colors_1 = __importDefault(require("colors"));
const connectDB = async () => {
    const { DB_HOST } = process.env;
    if (!DB_HOST) {
        throw new Error("Miss DB_HOST variable!");
    }
    const db = await (0, mongoose_1.connect)(DB_HOST);
    const hostMSG = "host:" + colors_1.default.bold.italic(`${db.connection.host}`) + ",\n";
    const portMSG = "port:" + colors_1.default.bold.italic(`${db.connection.port}`) + ",\n";
    const dbNameMSG = "db_name:" + colors_1.default.bold.italic(`${db.connection.name}`);
    const message = "Data Base connected on\n" + hostMSG + portMSG + dbNameMSG;
    console.log(message.green);
};
exports.default = connectDB;
