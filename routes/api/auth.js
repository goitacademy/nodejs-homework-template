const express = require("express");
const router = express.Router();
const authController = require("../../controllers/auth");

router.post("/signup", authController.signup)


router.post("/login", async (req, res, next) => {});

module.exports = router;
