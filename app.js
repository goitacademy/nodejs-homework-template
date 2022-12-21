const express = require("express");
const logger = require("morgan");
const cors = require("cors");

// const multer = require("multer");
// const path = require("path");

const contactsRouter = require("./routes/api/contacts");
const authRouter = require("./routes/api/auth");
const uploadsRouter = require("./routes/api/uploads");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/auth", authRouter);
app.use("/api/contacts", contactsRouter);
app.use("/api/upload", uploadsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  console.log(err);
  res
    .status(err.status || 500)
    .json({ status: err.status || 500, code: err?.code, message: err.message });
});

// const tempDir = path.join(__dirname, "temp");

// const storage = multer.diskStorage({
//   destination: tempDir,
//   fileName: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
// });

// const upload = multer({
//   storage,
// });

// app.post('/upload/avatar', upload.)

module.exports = app;
