const {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
} = require("../../controllers/auth");

const checkAuth = require("../../middlewares/checkAuth");
const validateSchema = require("../../middlewares/validateSchema");
const { userSchema } = require("../../schemas/users");
const router = require("express").Router();

router.post("/register", validateSchema(userSchema), registerUser);

router.post("/login", validateSchema(userSchema), loginUser);

router.post("/login", checkAuth, logoutUser);

router.get("/current", checkAuth, getCurrentUser);

module.exports = router;
