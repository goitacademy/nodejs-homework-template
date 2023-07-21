const express = require("express");
const userCtrl = require("../../controllers/users");
const { validateBody, authenticate } = require("../../middlewares");
const { schemas } = require("../../models/user");

const router = express.Router();

router.patch(
  "/",
  authenticate,
  validateBody(schemas.updateSubscribtion),
  userCtrl.updateSubscribtion
);

module.exports = router;
