const router = require("express").Router();
const userAuth = require("../middleware/auth");
const upload = require("../middleware/upload");
const {
  register,
  login,
  update,
  getCurrent,
  logout,
  updateAvatar,
} = require("../controllers/Auth");

router.post("/signup", register);
router.post("/login", login);
router.get("/current", userAuth, getCurrent);
router.post("/logout", userAuth, logout);
router.patch("/", userAuth, update);
router.patch("/avatars", userAuth, upload.single("avatars"), updateAvatar);
module.exports = router;
