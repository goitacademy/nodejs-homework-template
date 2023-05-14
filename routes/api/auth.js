/* eslint-disable no-unused-vars */
const express = require("express");
const router = express.Router();
const { ctrlWrapper } = require("../../helpers/index");
const controller = require("../../controllers/auth");
const authTokenValid = require("../../middlewares/index");
router.post("/register", ctrlWrapper(controller.registration));
router.post("/login", ctrlWrapper(controller.login));
router.get(
  "/current",
  ctrlWrapper(authTokenValid),
  ctrlWrapper(controller.getInfoUser)
);
router.post(
  "/logout",
  ctrlWrapper(authTokenValid),
  ctrlWrapper(controller.logout)
);
module.exports = router;
