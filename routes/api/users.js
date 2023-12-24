const express = require('express');

const {authentificate, upload}  = require('../../middlewares');

const ctrl = require("../../controllers/users");

const router = express.Router() ;

// change user avatar
router.patch("/avatars", authentificate, upload.single("avatar"), ctrl.updateAvatar);

module.exports = router;