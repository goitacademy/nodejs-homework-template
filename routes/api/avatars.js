const express = require("express");

const {upload, controllerWrapper} = require("../../middlewares");
const {avatars: ctrl} = require("../../controllers");

const router = express.Router();

router.post("/", upload.single("photo"), controllerWrapper(ctrl.add));

router.get("/", controllerWrapper(ctrl.getAll));

module.exports = router;