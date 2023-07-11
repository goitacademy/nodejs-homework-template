const express = require("express");
const ctrls = require("../../controllers/contacts");
const { validateBody } = require("../../middleware");

const router = express.Router();

router.get("/", ctrls.listContacts);

router.get("/:contactId", ctrls.getContactById);

router.post("/", validateBody, ctrls.addContact);

router.delete("/:contactId", ctrls.removeContact);

router.put("/:contactId", validateBody, ctrls.updateContact);

module.exports = router;
