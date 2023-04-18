const express = require("express");
const { contacsCtrls } = require("../../controllers");
const { contactsSchemas } = require("../../models");
const { validateBody, isBody, isValidId } = require("../../middlewares");

const router = express.Router();

router.get("/", contacsCtrls.listContacts);

router.get("/:contactId", isValidId, contacsCtrls.getById);

router.post("/", validateBody(contactsSchemas.addSchema), contacsCtrls.addContact);

router.delete("/:contactId", isValidId, contacsCtrls.deleteContact);

router.put("/:contactId", isValidId, isBody, validateBody(contactsSchemas.updSchema), contacsCtrls.updateContact);

router.patch("/:contactId/favorite", isValidId, isBody, validateBody(contactsSchemas.updStatusSchema), contacsCtrls.updateStatusContact);

module.exports = router;
