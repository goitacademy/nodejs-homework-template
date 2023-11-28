const express = require("express");
const router = express.Router();
const jsonParser = express.json();
const { userController } = require("../controllers");
const { authenteficate } = require("../middlewares");

router.post("/register", jsonParser, userController.register);
router.post("/login", jsonParser, userController.login);
router.post("/logout", authenteficate, userController.logout);
router.get("/current", authenteficate, userController.current);
router.patch("/", authenteficate, userController.updateSubscription);

module.exports = router;
