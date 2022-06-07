const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const authMiddleware = require("./middlewares/jwt");
const path = require("path");
const fs = require("fs").promises;
const { v4: uuidv4 } = require("uuid");
const multer = require("multer");
var Jimp = require("jimp");

const contactsRouter = require("./routes/api/contacts");
const authRouter = require("./routes/api/auth");
const listRouter = require("./routes/api/current");
const logoutRouter = require("./routes/api/logout");
const { findOneAndUpdate } = require("./service/schemas/contacts");
const User = require("./service/schemas/User");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

const uploadDir = path.join(process.cwd(), "tmp");
const storeDir = path.join(process.cwd(), "public/avatars");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${uuidv4()}${file.originalname}`);
  },
});

const extensionWhiteList = [".jpg", ".jpeg", ".png", ".gif"];
const mimetypeWhiteList = ["image/png", "image/jpg", "image/jpeg", "image/gif"];

const multerInstance = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const extension = path.extname(file.originalname);
    const mimetype = file.mimetype;
    if (
      !extensionWhiteList.includes(extension) ||
      !mimetypeWhiteList.includes(mimetype)
    ) {
      return cb(null, false);
    }
    return cb(null, true);
  },
  limits: { fileSize: 1231244 },
});

app.patch(
  "/users/avatars",
  authMiddleware,
  multerInstance.single("picture"),
  async (req, res, next) => {
    if (!req.file) {
      return res.status(400).json({ message: "this is not a photo" });
    }

    const { path: temporaryName } = req.file;

    const extension = path.extname(temporaryName);
    const fileName = path.join(storeDir, `${uuidv4()}${extension}`);

    try {
      await Jimp.read(temporaryName)
        .then((image) => {
          image.resize(250, 250).write(temporaryName);
        })
        .catch(async (err) => {
          await fs.unlink(temporaryName)
          return res.status(400).json({ message: "this is not a photo" });
        });

      await fs.rename(temporaryName, fileName);
    } catch (err) {
      return next(err);
    }

    const result = await User.findOneAndUpdate(
      {
        email: req.user.email,
      },
      { $set: { avatarURL: fileName } },
      {
        new: true,
        runValidators: true,
        strict: "throw",
      }
    );

    return res.json({ avatarURL: result.avatarURL });
  }
);

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/contacts", authMiddleware, contactsRouter);
app.use("/users", authRouter);
app.use("/users/current", authMiddleware, listRouter);
app.use("/users/logout", authMiddleware, logoutRouter);

app.use((err, _, res, __) => {
  console.log(err.stack);

  res.status(500).json({
    message: err.message,
  });
});

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = {
  app,
  storeDir,
  uploadDir,
};
