const express = require("express");
const { auth, ctrlWrapper } = require("../../middlewares");
const router = express.Router();
const { users: ctrl } = require("../../controllers/");

router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));
module.exports = router;
