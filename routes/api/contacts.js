const express = require("express");
const router = express.Router();
const validateBody = require("../../middleware/validateBody");
const schema = require("../../schemas/contactsSchema");

const ctr = require("../../controllers/contactsController");

router.get("/", ctr.listContacts);

router.get("/:contactId", ctr.getContactById);

router.post("/", validateBody(schema.addSchema), ctr.addContact);

router.delete("/:contactId", ctr.removeContact);

router.put("/:contactId", validateBody(schema.addSchema), ctr.updateContact);

module.exports = router;
