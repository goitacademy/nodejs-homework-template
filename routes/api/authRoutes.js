const express = require("express");
const router = express.Router();

const controllers = require("../../controllers/userControllers");
const controllersAuth = require("../../controllers/authControllers");

router.get("/", controllers.getUsers);
router.post("/", controllers.createUser);
router.delete("/:id", controllers.deleteUser);
router.get("/:id", controllers.getUserId);

// router.post("/login", controllers.login);
router.post("/register", controllersAuth.signup);

module.exports = router;
