const express = require("express");
const controllers = require("../../controllers/auth-controllers");
const { authenticate } = require("../../middlewares/index");


const router = express.Router();

router.post("/users/register", controllers.signup);

router.post("/users/login", controllers.signin);

router.get("/users/current", authenticate, controllers.getCurrent);

router.post("/users/logout",authenticate, controllers.logout);



module.exports = router;