const express = require("express");

const {
  authenticate,
  ctrlWrapper,
} = require("../../middlewares");
const { auth: ctrl } = require("../../controllers");

const router = express.Router();

router.get(
  "/current",
  authenticate,
  ctrlWrapper(ctrl.getCurrent)
);

module.exports = router;
