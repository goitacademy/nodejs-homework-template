const express = require("express");
const router = express.Router();

const  config = require("../../config/config");
const multer = require("multer");
const uploadController = require("../../controller/upload.controller");


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, config.UPLOAD_DIR);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" +  file.originalname);
  },
}); 

const upload = multer({
  storage,
});

router.post("/upload", upload.single("picture"), uploadController.uploadFile);

module.exports = router;