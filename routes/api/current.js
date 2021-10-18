const express = require("express");

const { joiSchema } = require("../../models/order");
const {
  controllerWrapper,
  validation,
  authenticate,
} = require("../../middlewares");

const { orders: ctrl } = require("../../controllers");

const router = express.Router();

router.post(
  "/",
  authenticate,
  validation(joiSchema),
  controllerWrapper(ctrl.add)
);
router.get("/", authenticate, controllerWrapper(ctrl.getAll));

module.exports = router;
