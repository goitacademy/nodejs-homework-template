const express = require("express");

const tryCatchWrapper = require("../../utils/controllerWrapper");

const {
    userRegister,
    userLogin,
    userLogout,
  } = require("../../controllers/users");

const router = express.Router();

router.post("/register", tryCatchWrapper(userRegister));

router.post("/login", tryCatchWrapper(userLogin));

router.post("/logout", tryCatchWrapper(userLogout));

module.exports = router;