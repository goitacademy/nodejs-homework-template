const express = require("express");
const router = express.Router();
const controllerContact = require('../../controller/contactsController/index')
const auth= require('../../middlewares/auth')

// router.use(auth)

router.get("/",auth, controllerContact.allContacts);

router.get("/:contactId",auth, controllerContact.getById);

router.get("/search",controllerContact.serchInContacts);

router.post("/", controllerContact.addContact);

router.delete("/:contactId", controllerContact.removeContact);

router.put("/:contactId", controllerContact.updateContact);

router.patch("/:contactId",controllerContact.chengOfPart);

module.exports = router;
