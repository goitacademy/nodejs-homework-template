const express = require("express");
const router = express.Router();
const { createContact, getContacts, me } =require ("../../controllers/users");
const {
    tryCatchWrapper,
  } = require("../../middleware/index");
  
const { auth } = require("../../middleware/auth");


router.post("/contacts", tryCatchWrapper(auth), tryCatchWrapper(createContact));
router.get("/contacts", tryCatchWrapper(auth), tryCatchWrapper(getContacts));
router.get("/me", tryCatchWrapper(auth), tryCatchWrapper(me));


module.exports = router;