const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
mongoose.set("strictQuery", false);
// const multer = require("multer");
// const path = require("path");

dotenv.config();

const { DB_HOST } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => console.log("Database connection successful"))
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

const authRouter = require("./routes/api/auth");
const contactsRouter = require("./routes/api/contacts");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use(express.static("public"));

app.use("/api/users", authRouter);
app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

// const publicImgDir = path.join(__dirname, "public");

// const multerConfig = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, publicImgDir);
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
//   limits: {
//     fileSize: 2048,
//   },
// });

// const upload = multer({
//   storage: multerConfig,
// });

// app.post("/api/avatars", upload.single("image"), async (req, res) => {
//   console.log(req.file);
// });

module.exports = app;
