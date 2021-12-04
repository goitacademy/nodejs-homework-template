const express = require("express");
const ctrlWrapper = require("../../middlewares/ctrtWrapper");
const { joiValidation, tokenValidation } = require("../../middlewares/auth");
const { auth, users } = require("../../controllers");

const router = express.Router();

router.get("/current", tokenValidation, ctrlWrapper(users.getUser));
router.post("/signup", joiValidation, ctrlWrapper(auth.signup));
router.post("/signin", joiValidation, ctrlWrapper(auth.signin));
router.get("/signout", tokenValidation, ctrlWrapper(auth.signout));
router.patch("/", tokenValidation, ctrlWrapper(users.changeSubscription));

module.exports = router;
