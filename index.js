const Jimp = require("jimp");
const fs = require("fs").promises;
const express = require("express");
const path = require("path");
const multer = require("multer");
const { v4: uuidV4 } = require("uuid");

const isAccessible = (path) =>
  fs
    .access(path)
    .then(() => true)
    .catch(() => false);

const setupFolder = async (path) => {
  const folderAvailable = await isAccessible(path);
  if (!folderAvailable) {
    try {
      await fs.mkdir(path);
    } catch (e) {
      console.log("no permissions!");
      process.exit(1);
    }
  }
};

const app = express();

const tempDir = path.join(process.cwd(), "temp");
const storeImageDir = path.join(process.cwd(), "public/images");

app.set("view engine", "ejs");
app.use(express.static(path.resolve(__dirname, "./public")));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${uuidV4()}${file.originalname}`);
  },
});

const extensionWhiteList = [".jpg", ".jpeg", ".png", ".gif"];
const mimetypeWhiteList = ["image/png", "image/jpg", "image/jpeg", "image/gif"];

const uploadMiddleware = multer({
  storage,
  fileFilter: async (req, file, cb) => {
    const extension = path.extname(file.originalname).toLowerCase();
    const mimetype = file.mimetype;
    if (
      !extensionWhiteList.includes(extension) ||
      !mimetypeWhiteList.includes(mimetype)
    ) {
      return cb(null, false);
    }
    return cb(null, true);
  },
  limits: {
    fileSize: 1024 * 1024 * 5, // 5MB
  },
});

const AVATAR_WIDTH = 512;
const AVATAR_HEIGHT = 512;

const isImageAndTransform = async (path) =>
  new Promise((resolve) => {
    Jimp.read(path, async (err, image) => {
      if (err) resolve(false);

      try {
        const w = image.getWidth();
        const h = image.getHeight();

        const cropWidth = w > AVATAR_WIDTH ? AVATAR_WIDTH : w;
        const cropHeight = h > AVATAR_HEIGHT ? AVATAR_HEIGHT : h;

        const centerX = Math.round(w / 2 - cropWidth / 2);
        const centerY = Math.round(h / 2 - cropHeight / 2);

        await image
          .rotate(360)
          .crop(
            centerX < 0 ? 0 : centerX,
            centerY < 0 ? 0 : centerY,
            cropWidth,
            cropHeight
          )
          .sepia()
          .write(path);
        resolve(true);
      } catch (e) {
        console.log(e);
        resolve(false);
      }
    });
  });

// .array(pictures)
app.post(
  "/upload",
  uploadMiddleware.single("picture"),
  async (req, res, next) => {
    if (!req.file) {
      return res.status(400).json({ message: "File isn't a photo" });
    }

    const { path: temporaryPath } = req.file;
    const extension = path.extname(temporaryPath);
    const fileName = `${uuidV4()}${extension}`;
    const filePath = path.join(storeImageDir, fileName);

    try {
      await fs.rename(temporaryPath, filePath);
    } catch (e) {
      console.log(e);
      await fs.unlink(temporaryPath);
      return next(e);
    }

    const isValidAndTransform = await isImageAndTransform(filePath);
    if (!isValidAndTransform) {
      await fs.unlink(filePath);
      return res
        .status(400)
        .json({ message: "File isnt a photo but is pretending" });
    }

    res.redirect(`/uploaded/${fileName}`);
    // http://localhost:3000/uploaded/3d9f9582-7438-4451-9178-6d33bcfbbea2.jpg
  }
);

app.get("/uploaded/:imgPath", (req, res) => {
  const { imgPath } = req.params;
  res.render("uploaded", { imgPath });
});

app.use((req, res, next) => {
  res.status(404).json({ message: "page not found" });
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ message: err.message, status: err.status });
});

app.listen(3000, async () => {
  await setupFolder(tempDir);
  await setupFolder(storeImageDir);
});
