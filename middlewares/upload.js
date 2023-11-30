import multer from "multer";
import path from "path";

const destination = path.resolve("tmp");

const storage = multer.diskStorage({
  destination,
  filename: (req, file, cb) => {
    const extension = file.originalname.split(".")[1];
    const uniqueId = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueId + "." + extension);
  },
});

const limits = {
  fileSize: 5 * 1024 * 1024,
};

const upload = multer({ storage, limits });

export default upload;
