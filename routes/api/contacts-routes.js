const express = require("express");
const contactsControllers = require("../../controllers/contacts");
const router = express.Router();
const jsonParser = express.json();

 const { authenticate } = require("../../middlewares/authenticate");

 router.use(authenticate);

router.get("/", jsonParser, authenticate, contactsControllers.getAllContacts);
router.get("/:contactId", jsonParser, authenticate, contactsControllers.getContactById);
router.post("/", jsonParser, authenticate, contactsControllers.addContact);
router.delete("/:contactId", jsonParser, authenticate, contactsControllers.deleteContactById);
router.put("/:contactId", jsonParser, authenticate, contactsControllers.updateContactById);


module.exports = router;