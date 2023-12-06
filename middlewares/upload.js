import multer from "multer";
import { fileURLToPath } from "url";
import path from "path";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const tmpDir = path.join(dirname, "../", "tmp");

const multerConfig = multer.diskStorage({
  destination: tmpDir,
  //
  // A hint on how to give a custom file name
  //
  // filename: (req, file, cb) =>{
  //     cb(null, file.originalname);
  // }
});

const upload = multer({
  storage: multerConfig,
});

export default upload;
