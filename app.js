const fs = require("fs").promises;
const path = require("path");
const moment = require("moment");
const multer = require("multer");
const Jimp = require("jimp");
const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const tempDir = path.join(process.cwd(), "tmp");
const finalDir = path.join(process.cwd(), "public", "avatars");
console.log(tempDir);
const isAcessible = async (path) => {
  try {
    await fs.access(path);
    return true;
  } catch (e) {
    return false;
  }
};

const createFolderIfItDoesntExist = async (folder) => {
  try {
    if (!(await isAcessible(folder))) {
      await fs.mkdir(folder);
    }
  } catch (e) {
    console.log("not enough permissions");
    process.exit(1);
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${moment().format("HH:mm:ss:ms")}-${file.originalname}`);
  },
});

const extensionWhiteList = [".jpg", ".jpeg", ".png", ".gif"];
const mimetypeWhiteList = ["image/png", "image/jpg", "image/jpeg", "image/gif"];

const uploadMiddleware = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const extension = path.extname(file.originalname).toLowerCase();
    const mimetype = file.mimetype;
    if (
      !extensionWhiteList.includes(extension) ||
      !mimetypeWhiteList.includes(mimetype)
    ) {
      return cb(new Error("File is the wrong format"));
    }
    return cb(null, true);
  },
  limits: {
    fileSize: 8 * 1024 * 16, // 16KB
    // 0|1 - bit
    // 1 bit
    // 8 bitów === Bajt
    // 1KB = 1000 * Bajt (8)
    // 1KiB = 1024 * Bajt
    // 1024KB = MB
    // 1024MB = 1GB
    // 1024GB = 1TB
    // 1024TB = 1PB - petabajt
    // 1TB
    // 1000 = KB
  },
});

const isImage = async (imagePath) =>
  new Promise((resolve) => {
    try {
      Jimp.read(imagePath, (err, image) => {
        // !! truthy => true
        // !! falsey => false
        // !!"1" => true
        // !!"0" => true
        // !!0 => false
        if (!!err) {
          resolve(false);
        } else {
          image.rotate(360).resize(256, 256).greyscale().write(imagePath);
          resolve(true);
        }
      });
    } catch (err) {
      resolve(false);
    }
  });

const contactsRouter = require("./routes/api/contacts");
const userRouter = require("./routes/api/users");

const app = express();

require("dotenv").config();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";
app.use(express.static(path.join(__dirname, "public")));
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use("/api", contactsRouter);
app.use("/users", userRouter);
app.post(
  "/upload",
  uploadMiddleware.single("picture"),
  async (req, res, next) => {
    if (!req.file) {
      return res.status(400).json({ message: "There is no file" });
    }

    const { description } = req.body;
    const { path: temporaryName } = req.file;
    const fileName = path.join(finalDir, req.file.filename);

    try {
      await fs.rename(temporaryName, fileName);
    } catch (err) {
      await fs.unlink(temporaryName);
      return next(err);
    }

    // we do a proper check if it's a photo
    const isValid = await isImage(fileName);
    if (!isValid) {
      await fs.unlink(fileName);
      return res
        .status(400)
        .json({ message: "File isnt a photo but it's pretending" });
    }

    res.json({
      description,
      fileName,
      message: "File uploaded correctly",
      status: 200,
    });
  }
);
app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
