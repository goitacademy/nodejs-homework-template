const express = require("express");
const router = express.Router();

const contactsListControllers = require("./controllers")

router.get("/", contactsListControllers.getAllContacts);

router.get("/:contactId", contactsListControllers.getSingleContactById);

router.post("/", contactsListControllers.postContact);

router.delete("/:contactId", contactsListControllers.deleteContactById);

router.put("/:contactId", contactsListControllers.updateContactById);

module.exports = router;
