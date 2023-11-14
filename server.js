import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";
import router from "./api/index.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api", router);

app.use((_, res, __) => {
  res.status(404).json({
    status: "error",
    code: 404,
    message: "Use api on routes: /api/contacts",
    data: "Not found",
  });
});

app.use((err, _, res, __) => {
  console.log(err.stack);
  res.status(500).json({
    status: "fail",
    code: 500,
    message: err.message,
    data: "Internal Server Error",
  });
});

const PORT = 3000;

const connection = mongoose.connect(process.env.DB_HOST, {
  dbName: "db-contacts",
});

connection
  .then(() => {
    console.log("\nDatabase connection successful");
    app.listen(PORT, () => {
      console.log(`Server running. App listens on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(`\nServer not running. Error message: [${err}]\n`);
    process.exit(1);
  });
