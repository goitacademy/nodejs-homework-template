const express = require("express");
const { basedir } = global;
const { auth, ctrlWrapper } = require(`${basedir}/middlewares`);
const { users: ctrl } = require(`${basedir}/controllers`);

const router = express.Router();

router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));

module.exports = router;
