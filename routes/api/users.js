const express = require("express");

const { auth, ctrlWrapper, validation } = require("../../middlewares");
const { users: ctrl } = require("../../controllers");
const { joiSubscribtionSchema } = require("../../models");

const router = express.Router();

router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));
router.patch(
  "/",
  auth,
  validation(joiSubscribtionSchema),
  ctrlWrapper(ctrl.updateSubscribtion)
);

module.exports = router;
