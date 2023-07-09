const router = require("express").Router();
const userAuth = require("../middleware/auth");
const { register, login, update, getCurrent, logout } = require("../controllers/Auth");

router.post("/signup", register);
router.post("/login", login);
router.get("/current", userAuth, getCurrent);
router.post("/logout", userAuth, logout);
router.patch("/", userAuth, update);

module.exports = router;
