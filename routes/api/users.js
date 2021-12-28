const express = require("express");

const {
  controlWrapper,
  auth,
  upload,
  validation,
  sizeChangerImage,
} = require("../../middlewares");
const { users: controllerContacts } = require("../../controller");
const { subscriptionJoiSchema } = require("../../model");

const router = express.Router();

router.get("/current", auth, controlWrapper(controllerContacts.getCurrent));
router.patch(
  "/",
  auth,
  validation(subscriptionJoiSchema),
  controlWrapper(controllerContacts.updateSubscriptionUser)
);
router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  sizeChangerImage,
  controlWrapper(controllerContacts.updateAvatar)
);

router.get(
  "/verify/:verificationToken",
  controlWrapper(controllerContacts.verifyEmail)
);

router.get("/verify/", controlWrapper(controllerContacts.verifyAgain));

module.exports = router;

// {

// "email": "bogdan@gmail.com",
// "password": "1111111"
// }
