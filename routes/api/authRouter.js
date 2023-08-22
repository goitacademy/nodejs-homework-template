const express = require("express");

const validateBody = require("../../middleware/validateBody");
const { register } = require("../../contollers/authControllers");
const { schemas } = require("../../models/userModel");

const router = express.Router();
router.post("/register", validateBody(schemas.registerSchema), register);
module.exports = router;
