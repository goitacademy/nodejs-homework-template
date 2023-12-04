const express = require("express");
const router = express.Router();
const jsonParser = express.json();

const auth = require("../../middleware/auth");

const upload = require("../../middleware/upload");

const userController = require("../../controllers/users/index");

router.get("/current", userController.getCurrent);
router.patch("/", userController.updateSubscription);
router.patch("/avatars", upload.single("avatar"), userController.uploadAvatar);
router.post("/verify", jsonParser, userController.verify);

module.exports = router;
