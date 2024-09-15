const express = require("express");
const authenticate = require("../../middlewares/auth");
const usersController = require("../../controllers/auth");

const router = express.Router();

router.get("/current", authenticate, usersController.getCurrentUser);

module.exports = router;
