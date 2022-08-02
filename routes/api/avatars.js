const express = require('express');

const { basedir } = global;

const ctrl = require(`${basedir}/controllers/auth`);

const { ctrlWrapper } = require(`${basedir}/helpers`);

const { auth, upload } = require(`${basedir}/middlewares`);

const router = express.Router();

// update users avatar
router.patch("/", auth, upload.single('avatar'), ctrlWrapper(ctrl.setAvatar));

module.exports = router;