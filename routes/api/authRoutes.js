const express = require("express");
const router = express.Router();
const { checlSignup } = require("../../middlewares/authMiddlewars");
const controllers = require("../../controllers/userControllers");
const controllersAuth = require("../../controllers/authControllers");
const { check } = require("express-validator");
const authMiddlewars = require("../../middlewares/authMiddlewars");

router.post("/login", controllersAuth.login);
router.post(
  "/register",
  [
    check("email", "имя не может быть пустым").notEmpty(),
    check("password", "имя не может быть пустым").isLength({ min: 4, max: 15 }),
  ],
  controllersAuth.registration
);

// ====================== добавляем protect что бы могли пользоваться только зареганые===========================================
router.use(authMiddlewars.protect);
router.get("/", controllers.getUsers);
router.post("/", controllers.createUser);
router.delete("/:id", controllers.deleteUser);
router.get("/:id", controllers.getUserId);
router.get("/current", controllers.getCurrent);

module.exports = router;
