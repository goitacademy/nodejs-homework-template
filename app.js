const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs/promises");
const { v4 } = require("uuid");
require("dotenv").config();

const authRouter = require("./routes/api/auth");
const usersRouter = require("./routes/api/users");
const contactsRouter = require("./routes/api/contacts");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const tempDir = path.join(__dirname, "temp");
const productsDir = path.join(__dirname, "public", "avatars");
console.log(productsDir);

const multerConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  limits: {
    fileSize: 2048,
  },
});

const upload = multer({
  storage: multerConfig,
});

app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/contacts", contactsRouter);

const products = [];

app.post("/api/contactss", upload.single("image"), async (req, res) => {
  const { path: tempUpload, originalname } = req.file;
  const resultUpload = path.join(productsDir, originalname);

  try {
    await fs.rename(tempUpload, resultUpload);
    const image = path.join("public", "avatars", originalname);
    const newProduct = {
      name: req.body.name,
      id: v4(),
      image,
    };
    console.log(req);
    products.push(newProduct);
    res.status(201).json(newProduct);
  } catch (error) {
    await fs.unlink(tempUpload);
  }
});

app.get("/api/contactss", async (req, res) => {
  res.json(products);
});

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  // res.status(500).json({ message: err.message })
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message: err.message });
});

module.exports = app;

// mongodb+srv://yuragms:<8DMDjaeKyTh9NR8>@cluster0.yg8ew.mongodb.net/test
