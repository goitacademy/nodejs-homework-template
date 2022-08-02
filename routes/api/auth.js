const express = require("express");
const router = express.Router();
const { basedir } = global;
const ctrl = require(`${basedir}/controllers/auth`);
const { auth } = require(`${basedir}/middlewares`);
const { ctrlWrapper } = require(`${basedir}/utils`);

router.post("/register", ctrlWrapper(ctrl.register));
router.post("/login", ctrlWrapper(ctrl.login));
router.post("/current", auth, ctrlWrapper(ctrl.getCurrent));
router.get("/logout", auth, ctrlWrapper(ctrl.logout));
router.patch("/users", auth, ctrlWrapper(ctrl.updateSubscriptionUser));

module.exports = router;
