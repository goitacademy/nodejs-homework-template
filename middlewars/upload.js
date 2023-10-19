import multer from "multer";
import path from "path";

const destination = path.resolve("tmp");

const storage = multer.diskStorage({
    destination,
    filename: (req, file, cb) => {
        const uniquePreffix = `${Date.now()}_${Math.round(Math.random() * 1E9)}`
        const fileName = `${uniquePreffix}_${file.originalname}`
        cb(null, fileName)
    }
})

const limits = {
    fileSize: 5 * 1024 * 1024,
}

const fileFilter = (req, file, cb) => {
    if (file.originalname.split(".").pop() === "exe") {
        cb(new Error ("File extention not allow"))
    }
    cb(null, true)
}

const upload = multer({
    storage,
    limits,
    fileFilter,
})

export default upload;