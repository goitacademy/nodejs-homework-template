const path = require('path');
const multer = require('multer');
const { v4: idv4 } = require('uuid');
const process = require('process');
const express = require('express');
const app = express();

const tempDir = path.join(process.cwd(), './public/temp');
const avatarDir = path.join(process.cwd(), './public/avatars');


app.use(express.static(avatarDir));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, tempDir);
    },
    filename: (req, file, cb) => {
        cb(null, `${idv4()}${file.originalname}`);
    }
});

const extensionWhiteList = ['.jpg', '.jpeg', '.png', '.gif'];
const mimetypeWhiteList = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif'];

const upload =  multer({
    storage, 
    fileFilter: async (req, file, cb) => {
        const extension = path.extname(file.originalname).toLowerCase();
        const mimetype = file.mimetype;

        if (!extensionWhiteList.includes(extension) || !mimetypeWhiteList.includes(mimetype)) {
            return cb(null, false);
        }
        return cb(null, true);
    },
    limits: {
        fileSize: 1024 * 1024 * 5
    }
});

module.exports = {upload};