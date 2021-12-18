const express = require("express");
const router = express.Router();
const wrapperCtrl = require("../../middlewares/wrapperCtrl");
const ctrl = require("../../controllers/users");
const auth = require("../../middlewares/auth");
const upload = require("../../middlewares/upload");

router.post("/signup", wrapperCtrl(ctrl.signup));
router.post("/signin", wrapperCtrl(ctrl.signin));
router.get("/current", auth, wrapperCtrl(ctrl.getCurrent));
router.get("/logout", auth, wrapperCtrl(ctrl.logout));
router.patch("/", auth, wrapperCtrl(ctrl.updateSub));
router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  wrapperCtrl(ctrl.avatarUpload)
);
module.exports = router;
