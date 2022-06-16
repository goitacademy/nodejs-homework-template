const express = require("express");
const router = express.Router();

const controllerWrapper = require("../../middlewares/controllerWrapper");
const userValidation = require("../../middlewares/validation");
const { joiUserRegisterSchema } = require("../../models/users");
const userController = require("../../controllers/userLogin/userController");

router.get(
  "/signup",
  userValidation(joiUserRegisterSchema),
  controllerWrapper(userController.register)
  //   (req, res) => {
  //     res.send("<h2>RegisterPage</h2>");
  //   }
);

module.exports = router;
