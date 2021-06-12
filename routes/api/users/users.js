const express = require("express");
const router = express.Router();
const { UsersRoutePaths } = require("../../../helpers/routePaths");
const isLoggedIn = require("../../../helpers/is-loggedin");
const upload = require("../../../helpers/upload");
const {
  validationNewUser,
  validationLoginUser,
  validationSubscription,
} = require("./validation");
const Controllers = require("../../../controllers/users-controllers");

router.post(UsersRoutePaths.signup, validationNewUser, Controllers.signup);
router.post(UsersRoutePaths.login, validationLoginUser, Controllers.login);
router.post(UsersRoutePaths.logout, isLoggedIn, Controllers.logout);
router.get(UsersRoutePaths.current, isLoggedIn, Controllers.current);
router.patch(
  UsersRoutePaths.home,
  isLoggedIn,
  validationSubscription,
  Controllers.updateSubscription,
);
router.patch(
  UsersRoutePaths.avatars,
  isLoggedIn,
  upload.single("avatar"),
  Controllers.avatars,
);

module.exports = router;
