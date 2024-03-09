const express = require("express");
const router = express.Router();
const { verifyToken } = require("../../controllers/verifyToken");
const { verify } = require("../../controllers/verify");

router.get("/verify/:verificationToken", verifyToken);
router.post("/verify", verify);

module.exports = router;
