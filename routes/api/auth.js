const express = require("express");
const controllers = require("../../controllers/auth");
const router = express.Router();
const validateBody = require("../../middlewares/validateBody");

router.post("/register", controllers.register);

router.post("/login", controllers.login);

router.post("/logout", controllers.logout);

router.get("/current", controllers.current);

module.exports = router;
