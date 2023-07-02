const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts");
const schema = require("../../schemas/contacts");
const validateBody = require("../../middleWares/validateBody");

router.get("/", ctrl.getAllContacts);

router.get("/:contactId", ctrl.getContactById);

router.post("/", validateBody(schema.addPostSchema), ctrl.addContact);

router.delete("/:contactId", ctrl.removeContact);

router.put("/:contactId", validateBody(schema.addPutSchema), ctrl.updateContact);

module.exports = router;
