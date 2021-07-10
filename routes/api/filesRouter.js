import express from 'express';
import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

import uploadController from '../../controllers/uploadController.js';
import { asyncWrapper } from '../../helpers/apiHelpers.js';

const FILE_DIR = path.resolve('tmp');

const filesRouter = new express.Router();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, FILE_DIR);
    },
    filename: (req, file, cb) => {
        const [filename, ext] = file.originalname.split('.');
        cb(null, `${uuidv4()}.${ext}`);
    },
});

const uploadMiddleware = multer({ storage });

filesRouter.post(
    '/upload',
    [uploadMiddleware.single('avatar')],
    asyncWrapper(uploadController),
);

export { filesRouter, uploadMiddleware };
