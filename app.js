const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const contactsRouter = require("./routes/api/contacts");
const usersRouter = require("./routes/api/users");
const path = require("path");
const app = express();

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/avatars");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use("/contacts", contactsRouter);
app.use("/users", usersRouter);
app.use(express.static(path.join(__dirname, "public")));
app.post("/upload", upload.single("avatar"), (req, res) => {
  res.json({ message: "Avatar uploaded successfully!" });
});
app.patch("/avatars", (req, res) => {
  try {
    res.status(200).json({ message: "Avatar updated successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = app;
