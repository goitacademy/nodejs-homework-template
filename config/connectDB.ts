import { connect } from "mongoose";
import colors from 'colors';


const connectDB = async () => {
    const { DB_HOST } = process.env;
    if (!DB_HOST) {
        throw new Error("Miss DB_HOST variable!");
    }

    const db = await connect(DB_HOST);
    const hostMSG = "host:" + colors.bold.italic(`${db.connection.host}`) + ",\n";
    const portMSG = "port:" + colors.bold.italic(`${db.connection.port}`) + ",\n";
    const dbNameMSG = "db_name:" + colors.bold.italic(`${db.connection.name}`);
    const message = "Data Base connected on\n" + hostMSG + portMSG + dbNameMSG;
    console.log(message.green);
}

export default connectDB;