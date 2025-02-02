import multer from "multer";
import {
  AVATARS_DIRECTORY,
  TEMP_DIRECTORY,
} from "../config/configDirectory.js";
import { nanoid } from "nanoid";
const storage = multer.diskStorage({
  destination: TEMP_DIRECTORY,
  filename: (req, file, callback) => {
    const timestamp = Date.now();
    const id = nanoid();
    const fileName = [timestamp, id, file.originalname].join("_");

    console.log(`Uploading "${fileName} [upload.js]`.yellow);

    callback(null, fileName);
  },
  limits: { fileSize: 1_000_000 },
});

// const fileFilter = (req, file, callback) => {
//   const isForbiddenFile = !file.originalname.includes("monke");
//   // const isForbiddenFile = file.originalname.includes("monke");

//   callback(null, isForbiddenFile);
// };

// export const upload = multer({ storage, fileFilter });

// const storage = multer.diskStorage({
//   destination: AVATARS_DIRECTORY,
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     const ext = path.extname(file.originalname); // Pobierz rozszerzenie pliku
//     cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
//   },
// });

export const upload = multer({ storage });
