const express = require("express");
const router = express.Router();
const RegisterController = require("../../controllers/users/verify");

router.get("/verify/:token", RegisterController.verify);
router.post("/verify/", RegisterController.verifyAgain);

module.exports = router;
