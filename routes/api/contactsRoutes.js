const express = require("express");

const contactController = require("../../controllers/contactControllers");

const router = express.Router();
const jsonParser = express.json();

router.get("/", contactController.listContacts);

router.get("/:contactId", contactController.getContactById);

router.post("/", jsonParser, contactController.addContact);

router.delete("/:contactId", contactController.removeContact);

router.put("/:contactId", jsonParser, contactController.updateContact);

router.patch('/:contactId/favorite', contactController.updateStatusOfContact);

module.exports = router;
