const multer = require("multer");
const uuid = require("uuid").v4;
const fse = require("fs-extra");
const path = require("path");
const dotenv = require("dotenv");

const { AppError } = require("../utils");
dotenv.config({ path: "./.env" });
const UPLOAD_DIR = path.join(process.cwd(), process.env.UPLOAD_DIR);

class AvatarsService {
  static upload(name) {
    const multerStorage = multer.diskStorage({
      destination: async (req, file, callbackFn) => {
        await fse.ensureDir(UPLOAD_DIR);
        callbackFn(null, UPLOAD_DIR);
      },
      filename: (req, file, callbackFn) => {
        const ext = file.mimetype.split("/")[1];
        callbackFn(null, `${req.user.id}-${uuid()}.${ext}`);
      },
    });

    const multerFilter = (req, file, callbackFn) => {
      if (file.mimetype.startsWith("image/")) {
        callbackFn(null, true);
      } else {
        callbackFn(new AppError(401, "Upload image only..."), false);
      }
    };
    return multer({
      storage: multerStorage,
      fileFilter: multerFilter,
      limits: {
        fileSize: 1024 * 1024,
      },
    }).single(name);
  }
}

module.exports = AvatarsService;