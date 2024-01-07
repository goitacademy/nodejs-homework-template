const Router = require("express");
const router = Router();
const { authControllers } = require("../../controllers/authControllers");
const { authMiddlewars } = require("../../middlewares");
router.post("/login");
router.post("/signup");
