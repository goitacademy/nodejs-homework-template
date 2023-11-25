const express = require("express");
const router = express.Router();
const Ctrl = require("../../controllers/avatars");
const upload = require("../../middleware/uploadAvatars");

// создаём роутер с методом патч для изменения одного файла в документе. с помощью upload берем один файл
router.patch("/avatars", upload.single("avatar"), Ctrl.avatar);

module.exports = router;