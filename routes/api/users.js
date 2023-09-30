const express = require("express");

const { basedir } = global;

const ctrl = require(`${basedir}/controllers/users`);

const { ctrlWrapper } = require(`${basedir}/helpers`);

const { users } = require(`${basedir}/middlewares`);

const router = express.Router();

router.post("/register", ctrlWrapper(ctrl.register));
router.post("/login", ctrlWrapper(ctrl.login));
router.get("/current", users, ctrlWrapper(ctrl.getCurrent));
router.get("/logout", users, ctrlWrapper(ctrl.logout));
router.patch("/current", users, ctrlWrapper(ctrl.updateUserSubscription));

module.exports = router;
