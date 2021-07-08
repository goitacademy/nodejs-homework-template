import express from 'express';
import multer from 'multer';
import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

import filesController from '../../controllers/filesController.js';
import { authValidation } from '../../middlewares/validationMiddleware.js';
import { asyncWrapper } from '../../helpers/apiHelpers.js';
import authMiddleware from '../../middlewares/authMiddleware.js';

const FILE_DIR = path.resolve('public');

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

filesRouter
    .post(
        '/upload',
        [uploadMiddleware.single('avatar')],
        asyncWrapper(filesController),
    )
    .use('/download', express.static('public'));

export default filesRouter;
