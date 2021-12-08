const express = require("express");
const ctrlWrapper = require("../../middlewares/ctrtWrapper");
const { tokenValidation } = require("../../middlewares/auth");
const Users = require("../../classControllers/Users");

const router = express.Router();

const users = new Users();

router.get("/current", tokenValidation, ctrlWrapper(users.getUser));
router.patch("/", tokenValidation, ctrlWrapper(users.changeSubscription));

module.exports = router;
