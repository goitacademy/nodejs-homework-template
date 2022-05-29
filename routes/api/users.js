const express = require("express");

const { auth } = require("../../middlewares");
const { users: controllers } = require("../../controllers");

const router = express.Router();

router.get("/current", auth, controllers.getCurrentUser);
router.patch("/subscription", auth, controllers.changeSubscription);
module.exports = router;
