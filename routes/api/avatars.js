const express = require("express");
const router = express.Router();
const Ctrl = require("../../controllers/avatars");
const upload = require("../../middleware/uploadAvatars");
const isValidId = require("../../middleware/validationBody")

// создаём роутер с методом патч для изменения одного файла в документе. с помощью upload берем один файл
router.patch("/avatars", isValidId, upload.single("avatar"), Ctrl.avatar);

module.exports = router;