const express = require("express");
const ContactControllers = require("../../controllers/contact");
const router = express.Router();
router.use("/:contactId", ContactControllers.validateContactId);
const jsonParser = express.json();

router.get("/", ContactControllers.getContacts);

router.get("/:contactId", ContactControllers.getContact);

router.post("/", jsonParser, ContactControllers.createContact);

router.delete("/:contactId", ContactControllers.deleteContact);

router.put("/:contactId", jsonParser, ContactControllers.updateContact);

router.patch("/:contactId/favorite", ContactControllers.updateStatusContact);

module.exports = router;
