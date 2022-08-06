const express = require("express");

const { basedir } = global;

const controller = require(`${basedir}/controllers/auth`);

const { ctrlWrapper } = require(`${basedir}/helpers`);

const { auth } = require(`${basedir}/middlewares`);

const router = express.Router();

// signup
router.post("/register", ctrlWrapper(controller.register));

router.post("/login", ctrlWrapper(controller.login));

router.get("current", auth, ctrlWrapper(controller.getCurrent));

router.get("logout", auth, ctrlWrapper(controller.logout));

module.exports = router;
