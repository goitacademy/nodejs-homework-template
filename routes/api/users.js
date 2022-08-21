const express = require('express');
const ctrl = require("../../controllers/users");
const {ctrlWrapper} = require("../../helpers");
const {auth} = require("../../middlewares");
const {upload} = require("../../middlewares/upload");
const router = express.Router();

router.post("/signup", ctrlWrapper(ctrl.signup));
router.post("/login", ctrlWrapper(ctrl.login));
router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));
router.get("/logout", auth, ctrlWrapper(ctrl.logout));
router.patch("/avatars", auth, upload.single("avatar"), ctrlWrapper(ctrl.updateAvatar));

module.exports = router;

