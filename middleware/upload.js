import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "tmp/");
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname;
    cb(null, uuidv4() + path.extname(fileName));
  },
});

export const upload = multer({ storage: storage });
