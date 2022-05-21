const express = require("express");
const ctrl = require("../../controllers/users");
const { ctrlWrapper } = require("../../helpers");

const { user } = require("../../middlewares");

const router = express.Router();

router.post("/signup", ctrlWrapper(ctrl.signUp));

router.patch("/:contactId/subscription", user, ctrlWrapper(ctrl.subscription));

router.post("/login", ctrlWrapper(ctrl.logIn));

router.get("/current", user, ctrlWrapper(ctrl.current));

router.get("/logout", user, ctrlWrapper(ctrl.logOut));

module.exports = router;
