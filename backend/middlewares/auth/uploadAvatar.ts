import { Request } from "express";
import multer, { FileFilterCallback } from 'multer';
import path from "path";


type DestinationCB = (error: Error | null, destination: string) => void;

const tempDir = path.join(__dirname, '..', '..', 'tmp');

const storage = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, cb: DestinationCB): void => {
        cb(null, tempDir);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    var typeArray = file.mimetype.split('/');
    var fileType = typeArray[1];
    if (file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
    ) {
        cb(null, true);
    } else {
        cb(null, false)
    }
}
const uploadAvatar = multer({
    storage,
    fileFilter,
});

export default uploadAvatar;