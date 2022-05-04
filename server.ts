const { mkdir } = require("fs").promises;
import app from "./app";
const db = require("./config/db");
require("dotenv").config();

db.then((result) => {
  app.listen(3000, async () => {
    await mkdir(process.env.UPLOAD_FOLDER, { recursive: true });
    console.log("Server running. Use our API on port: 3000");
  });
}).catch(console.error);
