const express = require("express");

const { joiSchema } = require("../../models/order");
const {
  validation,
  controllerWrapper,
  authenticate,
} = require("../../middlewares");
const { getAllOrders, addOrder } = require("../../controllers/orders");


const router = express.Router();
// console.log(validation(joiSchema));

const orderValidationMiddleware = validation(joiSchema);

router.get("/", controllerWrapper(authenticate), getAllOrders);

router.post(
  "/",
  controllerWrapper(authenticate),
  orderValidationMiddleware,
  controllerWrapper(addOrder)
);

module.exports = router;
