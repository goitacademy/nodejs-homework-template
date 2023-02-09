const { createContact, getContacts, me, verifyEmail, resendVerify  } =require ("../../controllers/user-controller")
const express = require("express");
const { tryCatchWrapper } = require("../../helpers/helpers");
const router = express.Router();
const { auth } = require("../../middleware/index");

router.post("/contacts", tryCatchWrapper(auth), tryCatchWrapper(createContact));
router.get("/contacts", tryCatchWrapper(auth), tryCatchWrapper(getContacts));
router.get("/me", tryCatchWrapper(auth), tryCatchWrapper(me));
router.get("/verify/:token",tryCatchWrapper(verifyEmail))
router.post("/verify",tryCatchWrapper(resendVerify))


module.exports = router;