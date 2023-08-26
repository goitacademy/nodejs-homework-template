const express = require("express");
const router = express.Router();
const RegisterController = require("../../controllers/users/current");

router.post("/current", RegisterController.current);

module.exports = router;
