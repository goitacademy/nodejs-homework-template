import multer from "multer";
import path from "path";

const tmpDir = path.join(__dirname, "../", "tmp");

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
