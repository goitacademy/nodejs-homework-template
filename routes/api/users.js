const express = require("express");
const router = express.Router();
const ctrlWrapper = require("../../helpers/ctrlWrapper");
const { registration } = require("../../controllers/users");

// const { validate } = require("../../middlewares/validateBody");
// const { userJoiSchema, userSchema, User } = require("../../models/user");

router.post("/register", ctrlWrapper(registration));

module.exports = router;
