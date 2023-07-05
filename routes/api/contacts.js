const express = require("express");
const ctrls = require("../../controllers/contacts");
const { validateBody, haveBody } = require("../../middleware/index");

const router = express.Router();

router.get("/", ctrls.getContacts);

router.get("/:contactId", ctrls.getContactById);

router.post("/", haveBody, validateBody, ctrls.addContact);

router.delete("/:contactId", ctrls.removeContact);

router.put("/:contactId", haveBody, validateBody, ctrls.updateContact);

module.exports = router;
