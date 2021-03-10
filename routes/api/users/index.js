const express = require("express");
const router = express.Router();
const usersController = require("../../../controllers/usersController");
const validate = require("./validation.js");

router.post("/auth/register", usersController.reg);
router.post("/login");
router.post("/logout");

module.exports = router;
