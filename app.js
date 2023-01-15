const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const contactsRouter = require("./routes/api/contacts");
const authRouter = require("./routes/api/auth");

const app = express();

const path = require("path");
const fs = require("fs/promises");
const nanoid = require("nanoid");
const multer = require("multer");
const contactsList = [];
const multerConfig = multer.diskStorage({
  destination: path.join(__dirname, "temp"),
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({
  storage: multerConfig,
});
const avatarDir = path.join(__dirname, "public", "avatars");
const addContact = async (req, res) => {
  const { path: tempUpload, filename } = req.file;
  const resultUpload = path.join(avatarDir, filename);
  await fs.rename(tempUpload, resultUpload);
  const cover = path.join("avatars", filename);
  const NewContact = {
    id: nanoid(),
    ...req.body,
    cover,
  };
  contactsList.push(NewContact);
  res.status(200).json(NewContact);
};
app.post("/api/contacts", upload.single("cover"), addContact);

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
// app.use(express.json());
app.use(express.static("public"));

app.use("/api/users", authRouter);
app.use("/api/contacts", contactsRouter);

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

module.exports = app;
