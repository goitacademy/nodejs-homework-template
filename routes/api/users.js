const express = require("express");

const { register, login, logout, updateAvatar } = require("../../controllers/users");

const { joiUserSchema } = require("../../models/user");

const {
  validation,
  controllerWrapper,
  authenticate,
  upload
} = require("../../middlewares");


// const upload =  require('../../middlewares/upload')

const router = express.Router();

const userValidationMiddleware = validation(joiUserSchema);

// console.log(register());
router.post("/signup", userValidationMiddleware, controllerWrapper(register));
router.post("/login", userValidationMiddleware, controllerWrapper(login));
router.get(
  "/logout",
  controllerWrapper(authenticate),
  controllerWrapper(logout)
);
router.patch('/avatars/:id', upload.single("avatar"), controllerWrapper(updateAvatar))

module.exports = router;
