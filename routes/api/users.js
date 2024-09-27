const express = require('express');
const { authenticate, upload } = require('../../middlewares');
const ctrl = require('../../controllers/users');

const router = express.Router();

// Змінити аватарку
// widdleware authenticate - щоб тільки для залогінених
// middleware upload.single("avatar") - означає, що аватарка прийде в полі "avatar", і задає, куди далі буде збережена
router.patch('/avatars', authenticate, upload.single("avatar"), ctrl.updateAvatar);

module.exports = router;