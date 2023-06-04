const express = require("express");
const router = express.Router();
const validateBody = require("../../decorators/validateBody");
const newUserSchema = require("../../schemas/users-schemas");

const {registerNewUSer, loginUser} = require("../../controllers/users-controllers");

router.post("/register", validateBody(newUserSchema), registerNewUSer);
router.post("/login", validateBody(newUserSchema), loginUser)

module.exports = router;
