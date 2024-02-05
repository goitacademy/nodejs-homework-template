import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import router from "./api/index.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/contacts", router);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

const connection = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://smuku:michcu@cluster0.a9vnuyl.mongodb.net/admin?retryWrites=true&loadBalanced=false&replicaSet=atlas-egfauu-shard-0&readPreference=primary&srvServiceName=mongodb&connectTimeoutMS=10000&authSource=admin&authMechanism=SCRAM-SHA-1",
      { dbName: "db-contacts" }
    );
    console.log("Database connection successful");

    app.listen(3000, () => {
      console.log(`Server running. Use our API on port: 3000`);
    });
  } catch (err) {
    console.log(`Server not running. Error message: ${err.message}`);
    process.exit(1);
  }
};

connection();
