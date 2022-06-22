const express = require("express");
const { currentUser: controllers } = require("../../controllers");

const router = express.Router();

router.get("/current", controllers.getCurrentUser);

module.exports = router;
