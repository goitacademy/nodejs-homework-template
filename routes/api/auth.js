const express = require("express");

const { basedir } = global;

const controller = require(`${basedir}/controllers/auth`);

const { ctrlWrapper } = require(`${basedir}/helpers`);

const router = express.Router();

// signup
router.post("/register", ctrlWrapper(controller.register));

router.post("/login", ctrlWrapper(controller.login));

// signin
// router.post("/login", ctrlWrapper(ctrl.login));

module.exports = router;
