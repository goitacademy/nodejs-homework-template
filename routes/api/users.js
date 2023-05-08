const express = require("express");
const router = express.Router();
const { ctrlWrapper } = require("../../helpers/index");
const controller = require("../../controllers/user");
router.post("", ctrlWrapper(controller));
router.post("", ctrlWrapper(controller));
router.post("", ctrlWrapper(controller));
module.exports = router;
