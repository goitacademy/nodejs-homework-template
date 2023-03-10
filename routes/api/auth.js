const express = require("express");
const { validateBody, isValidId } = require("../../middlewares");
const cntr = require("../../controllers/auth/auth")
const {schemas} = require("../../model/user")

const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), cntr.register)


module.exports = router;