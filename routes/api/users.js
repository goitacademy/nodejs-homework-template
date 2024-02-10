const express = require("express");
const router = express.Router();
const authMiddleware = require("../../middlewares/authMiddlewar");

const userController = require("../../controllers/user");

router.post("", authMiddleware, userController.addContact);
router.get("/contact", authMiddleware, userController.getContact);
router.get("/info", authMiddleware, userController.getInfo);

module.exports = router;
