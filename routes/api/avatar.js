const express = require("express");
const { uploadController } = require("../../models/avatars");
const path = require("path");
const uploadFile = require("../../services/multer/multerService");
const auth = require("../../middleware/auth");

const destinationPath = path.resolve("./public/avatars");

const router = express.Router();
const upload = uploadFile(destinationPath);

router.post("/upload", auth, upload.single("avatar"), uploadController);

router.use("/download", auth, express.static("public"));

module.exports = router;
