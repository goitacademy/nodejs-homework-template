const express = require("express");
const ctrl = require("../../controllers/users");
const router = express.Router();
const { auth, upload } = require("../../middlewares");
const { ctrlWrapper } = require("../../helpers");
const { schemas } = require("../../models/user");
const { validation } = require("../../middlewares");

router.post("/singup", validation(schemas.singup), ctrlWrapper(ctrl.singup));
router.post("/login", validation(schemas.login), ctrlWrapper(ctrl.login));
router.get("/current", auth, ctrl.getCurrent);
router.get("/logout", auth, ctrlWrapper(ctrl.logout));
router.patch("/avatars", auth, upload.single("avatar"), ctrl.updateAvatar);
module.exports = router;
