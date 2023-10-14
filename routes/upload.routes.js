const express = require("express");
const router = express.Router();
const uploadController = require("../controllers/upload.controller");
const { uploadFile } = uploadController;
const upload = require("../middlewares/upload");

router.post("/", upload('file'), uploadFile);

module.exports = router;
