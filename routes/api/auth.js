const express = require("express");
const router = express.Router();
const { asyncWrapper } = require("../../helpers/asyncWrapper");
const {
  addContactValidation,
  putContactValidation,
  favoriteValidation,
  userValidation,
  loginValidation,
  subscriptionValidation,
  uploadAvatar,
} = require("../../middlewares/validationMiddlewares");
const ctrl = require("../../controllers/auth");
const { authenticate, upload } = require("../../middlewares");

// SIGN UP
router.post("/signup", userValidation, asyncWrapper(ctrl.register));

// SIGN IN
router.post("/login", loginValidation, asyncWrapper(ctrl.login));

//GET CURRENT
router.get("/current", authenticate, asyncWrapper(ctrl.getCurrent));

//LOG OUT
router.get("/logout", authenticate, asyncWrapper(ctrl.logout));

// SUBSCRIPTION
router.patch(
  "/",
  authenticate,
  subscriptionValidation,
  asyncWrapper(ctrl.subscriptionStatus)
);

router.post("/avatars", upload.single("avatar"), ctrl.uploadAvatar);

// AVATARS UPDATE
// router.patch("/avatars", authenticate, upload.single("avatar"));

module.exports = router;
