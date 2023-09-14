import multer from "multer";
import { uploadDir } from "../../utils/manageUploadFolders.js";

const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 1048576,
  },
});

export default upload;
