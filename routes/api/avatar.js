const express = require("express");
const { upload, uploadController } = require("../../models/avatars");
const auth = require("../../middleware/auth");

const router = express.Router();

router.post("/upload", auth, upload.single("avatar"), uploadController);

router.use("/download", auth, express.static("public"));

module.exports = router;
