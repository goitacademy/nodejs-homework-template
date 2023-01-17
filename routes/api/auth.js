const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/auth")

const { ctrlWrapper } = require("../../helpers");

const { validateBody, isValidId } = require("../../middlewares");

const { schemas } = require("../../models/user");

router.post("/users/signup", validateBody(schemas.registerSchema), ctrlWrapper(ctrl.register))

module.exports = router;