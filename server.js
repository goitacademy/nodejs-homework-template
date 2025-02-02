import { startServer } from "./app.js";
import * as dbConnection from "./config/dbConnection.js";
import * as jwtFunctions from "./models/users/userShema.js";

const PORT = 3000;

await dbConnection.connectDB();

startServer(PORT);
