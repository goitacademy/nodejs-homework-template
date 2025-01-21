import { startServer } from "./app.js";
import * as dbConnection from "./models/dbConnection.js";
const PORT = 3000;

await dbConnection.connectDB();

startServer(PORT);
