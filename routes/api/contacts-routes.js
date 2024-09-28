const express = require("express");
const contactsControllers = require("../../controllers/contacts");
const router = express.Router();
const jsonParser = express.json();
const authenticate = require("../../middlewares/authenticate");

router.use(authenticate);

router.get("/", jsonParser, contactsControllers.getAllContacts);
router.get("/:contactId", jsonParser, contactsControllers.getContactById);
router.post("/", jsonParser, contactsControllers.addContact);
router.delete("/:contactId", jsonParser, contactsControllers.deleteContactById);
router.put("/:contactId", jsonParser, contactsControllers.updateContactById);

module.exports = router;
