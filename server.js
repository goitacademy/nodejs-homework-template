import app from "./app.js";
import mongoose from "mongoose";
// import swaggerUi from "swagger-ui-express";
// import swaggerDocument from "./swagger.json" assert { type: "json" };
import "dotenv/config.js";

// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const DB_HOST = process.env.DATABASE_URL;
const dbConnection = mongoose.connect(DB_HOST);

dbConnection
  .then(() => {
    app.listen(3000, () => {
      console.log("Server running. Use our API on port: 3000");
    });
  })
  .catch((e) => {
    console.log(`Error occured: ${e.message}`);
  });
