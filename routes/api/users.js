const express = require("express");

const { validation, ctrlWrapper, auth } = require("../../middlewares");
const { users } = require("../../controllers");
const {
  schemaSingup,
  schemaLogin,
  schemaUpdateSubscription,
} = require("../../models/user");

const router = express.Router();

router.post("/signup", validation(schemaSingup), ctrlWrapper(users.signup));

router.post("/login", validation(schemaLogin), ctrlWrapper(users.login));

router.get("/current", auth, ctrlWrapper(users.getCurrent));

router.get("/logout", auth, ctrlWrapper(users.logout));

router.patch(
  "/",
  auth,
  validation(schemaUpdateSubscription),
  ctrlWrapper(users.updateSubscription)
);

module.exports = router;
