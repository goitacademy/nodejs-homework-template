const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv"); 

// const fs = require("fs/promises");
// const { nanoid } = require("nanoid");
dotenv.config();



const { DB_HOST } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => console.log("Database connection successful"))
  .catch((error) => console.log(error.message));

const authRouter = require("./routes/api/auth");
const contactsRouter = require("./routes/api/contacts");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/users", authRouter);
app.use("/api/contacts", contactsRouter);
app.use(express.static("public"));

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});



// app.post("/contacts", upload.single("avatar"), async (req, res) => {
//   try {
//     const { originalname, path: tempUpload } = req.file;
//     const resultUpload = path.join(avatarsDir, originalname);
//     await fs.rename(tempUpload, resultUpload);
//     const avatar = path.join("avatars", originalname);
//     const newAvatar = {
//       _id: nanoid(),
//       ...req.body,
//       avatar,
//     };
//     avatars.push(newAvatar);
//     res.status(201).json(newAvatar);
//   } catch (error) {
//     await fs.unlink(req.file.path);
//   }
// });

module.exports = app;
