const express = require("express");
const { ctrlWrapper, auth } = require("../../middleware");
const ctrl = require("../../controllers");

const router = express.Router();

router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));
module.exports = router;
