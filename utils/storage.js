import path, { resolve } from "node:path";
import fs from "node:fs/promises";
import multer from "multer";
import colors from "colors";
import { rejects } from "node:assert";

const temporaryUpload = path.join(process.cwd(), "temporaryUpload");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, temporaryUpload);
  },
  filename: (req, file, callback) => {
    const typeIndex = file.originalname.indexOf(".");
    const type = file.originalname.slice(typeIndex);
    const name = `${req.user._id}_${file.fieldname}${type}`;
    callback(null, name);
  },
});

export const upload = multer({ storage });

export const dirExist = async (dir) => {
  dir.map(async (element) => {
    console.log(`${colors.cyan("[server]")} checking accessibility ${element}`);
    try {
      return await fs.access(element);
    } catch {
      console.log(`${colors.cyan("[server]")} creating dir ${element}`);
      await fs.mkdir(element);
    }
  });
};
