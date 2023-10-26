const express = require("express");

const tryCatchWrapper = require("../../utils/controllerWrapper");
const {auth} = require("../../utils/auth.js");

const {
    userRegister,
    userLogin,
    userLogout,
    userAll,
    userCurrent
  } = require("../../controllers/users");

const router = express.Router();

router.get("/", auth, tryCatchWrapper(userAll));

router.get("/current", auth,  tryCatchWrapper(userCurrent));

router.post("/register", tryCatchWrapper(userRegister));

router.post("/login",  tryCatchWrapper(userLogin));

router.post("/logout", auth,  tryCatchWrapper(userLogout));



module.exports = router;