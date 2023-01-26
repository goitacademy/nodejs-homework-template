
const express = require("express");
const { register, login, logout} = require("../../controllers/auth");
const getCurrent  = require("../../controllers/users");

const { auth } = require("../../middleware/auth");
const router = express.Router();
const {
    tryCatchWrapper,
    validationContact,
  } = require("../../middleware/index");
  
const userSchema = require("../../schemas/contactsSchema");

router.post("/register", validationContact(userSchema), tryCatchWrapper(register));
router.post("/login", validationContact(userSchema), tryCatchWrapper(login));
router.get("/logout",tryCatchWrapper(auth), tryCatchWrapper(logout));
router.get("/current",tryCatchWrapper(auth), tryCatchWrapper(getCurrent));

module.exports = router;