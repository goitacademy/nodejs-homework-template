const express = require("express");
const router = express.Router();

const controllerWrapper = require("../../middlewares/controllerWrapper");
const userValidation = require("../../middlewares/validation");
const {
  joiUserRegisterSchema,
  joiUserLoginSchema,
} = require("../../models/users");
const userController = require("../../controllers/userLogin/userController");
// const { register } = require("../../controllers/userLogin/userController");

router.post(
  "/signup",
  userValidation(joiUserRegisterSchema),
  controllerWrapper(userController.register)
  //   controllerWrapper(register)
  //   (req, res) => {
  //     res.send("<h2>Register Page</h2>");
  //   }
);
router.post(
  "/login",
  userValidation(joiUserLoginSchema),
  controllerWrapper(userController.login)
);

module.exports = router;
