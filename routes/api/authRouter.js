const express = require("express");
const avatar = require("../../midleWares/upload");

const router = express.Router();
const {
  createUserValidasionSchema,
  loginValidationSchema,
} = require("../../decorator/authValidationSchema");
const { singup, userLogin } = require("../../controlers/authControler");

const { logout, patchAvatar } = require("../../servises/authServices");

const authidentify = require("../../decorator/authidentify");
const validateBody = require("../../decorator/validateBody");
const upload = require("../../midleWares/upload");

const jsonParser = express.json();
// router.use(authidentify);

router.post(
  "/singup",
  jsonParser,
  validateBody(createUserValidasionSchema),
  patchAvatar,
  singup
);
// router.patch("/avatar", upload.single("avatar"), patchAvatar);

router.post(
  "/login",
  validateBody(loginValidationSchema),
  authidentify,
  userLogin
);
router.post("/logout", authidentify, logout);

module.exports = router;
