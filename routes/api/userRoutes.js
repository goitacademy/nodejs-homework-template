const express = require("express");

const tryCatchWrapper = require("../../utils/controllerWrapper");

const {
    userRegister,
    userLogin,
    userLogout,
    allUsers
  } = require("../../controllers/users");

const router = express.Router();

router.get("/", tryCatchWrapper(allUsers));

router.post("/register", tryCatchWrapper(userRegister));

router.post("/login", tryCatchWrapper(userLogin));

router.post("/logout", tryCatchWrapper(userLogout));


module.exports = router;