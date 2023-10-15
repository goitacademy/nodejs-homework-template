const express = require("express");
const router = express.Router();
const userController = require("../../controllers/user.controller");
const auth = require("../../middleware/auth");
const validateUpload = require("../middlewares/validateUpload");
const uploadAvatar = require("../controllers/multer.controller");

router.post("/login", userController.login);
router.post("/signup", userController.signup);
router.get("/logout", auth, userController.logout);
router.get("/current", auth, userController.current);
router.patch("/avatars", auth, validateUpload, uploadAvatar);

module.exports = router;
