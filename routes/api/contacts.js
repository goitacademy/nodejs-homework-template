const express = require("express");
const router = express.Router();
const controllerContact = require('../../controller/contactsController/index')
const auth= require('../../middlewares/auth')
const authNewMiddlware =require('../../middlewares/authNewMiddware')
// router.use(auth)

 router.use(authNewMiddlware)
//router.use(auth)
router.get("/", controllerContact.allContacts);

router.get("/:contactId", controllerContact.getById);

router.get("/search",controllerContact.serchInContacts);

router.post("/", controllerContact.addContact);

router.delete("/:contactId", controllerContact.removeContact);

router.put("/:contactId", controllerContact.updateContact);

router.patch("/:contactId",controllerContact.chengOfPart);

module.exports = router;
