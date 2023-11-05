const multer = require("multer");
const { resolve } = require("path");

const destination = resolve("temp");

const storage = multer.diskStorage({
  destination,
  filename: (req, file, cb) => {
    const uniquePrefix = `${Date.now()}_${Math.round(Math.random() * 1e9)}`;
    const filename = `${uniquePrefix}_${file.originalname}`;
    if (file.originalname.split(".").pop() === "exe") {
      cb(new Error("File extention not allowed"));
    }
    cb(null, filename);
  },
});

const limits = { fileSize: 5 * 1024 * 1024 };

const upload = multer({});
