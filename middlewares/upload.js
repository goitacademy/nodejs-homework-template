import multer from "multer";
import path from "path";

const destination = path.resolve("temp");

const storage = multer.diskStorage({
  destination,
  filename: (req, file, cb) => {
    const uniquePrefix = `${Date.now()}_${Math.round(Math.random() * 1e9)}`;
    const filename = `${uniquePrefix}_${file.originalname}`;

    cb(null, filename)
   }
})

const limits = {
  fileSize: 6 * 1024 * 1024,
}

const fileFilter = (req, file, cb) =>{
if (file.originalname.split(".").pop() === "exe") {
      cb(new Error("File extention isn`t allowed"));
  }
  cb(null, true);
}
  
const upload = multer({
  storage, limits, fileFilter
});

export default upload;