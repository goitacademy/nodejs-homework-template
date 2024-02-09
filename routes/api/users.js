const express = require("express");
const router = express.Router();

const userController = require("../../controllers/user");

router.post("", userController.addContact);
router.get("/contact", userController.getContact);
router.get("/info", userController.getInfo);

module.exports = router;
