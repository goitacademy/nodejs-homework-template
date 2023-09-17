import multer from "multer";

const storage = multer.diskStorage({
  destination: "tmp",
  filename: (_, file, cb) => {
    const uniqueName = Date.now();
    const original = file.originalname.split(".").pop();
    cb(null, uniqueName + "." + original);
  },
});
const upload = multer({
  storage,
});
export const uploadImage = upload.single("avatar");
