// const express = require("express");
const multer = require("multer");
const path = require("path");


const tempDir = path.join(__dirname,'../', "temp");
// const tempDir = './temp';

const multerConfig = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },

  limits: {
    fileSize: 2048,
  },
});

const uploadMiddlewar = multer({
  storage: multerConfig,
});

module.exports = uploadMiddlewar;
