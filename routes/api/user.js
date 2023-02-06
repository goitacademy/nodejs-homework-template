const { createContact, getContacts, me } =require ("../../controllers/user-controller")
const express = require("express");
const { tryCatchWrapper } = require("../../helpers/helpers");
const router = express.Router();
const { auth } = require("../../middleware/index");

router.post("/contacts", tryCatchWrapper(auth), tryCatchWrapper(createContact));
router.get("/contacts", tryCatchWrapper(auth), tryCatchWrapper(getContacts));
router.get("/me", tryCatchWrapper(auth), tryCatchWrapper(me));


module.exports = router;