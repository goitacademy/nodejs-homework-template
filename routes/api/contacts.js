const express = require("express");
const { contacsCtrls } = require("../../controllers");
const { contactsSchemas } = require("../../models");
const { validateBody, isBody, isValidId, authenticate } = require("../../middlewares");

const router = express.Router();

router.get("/", authenticate, contacsCtrls.listContacts);

router.get("/:contactId", authenticate, isValidId, contacsCtrls.getById);

router.post("/", authenticate, validateBody(contactsSchemas.addSchema), contacsCtrls.addContact);

router.delete("/:contactId", authenticate, isValidId, contacsCtrls.deleteContact);

router.put("/:contactId", authenticate, isValidId, isBody, validateBody(contactsSchemas.updSchema), contacsCtrls.updateContact);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  isBody,
  validateBody(contactsSchemas.updStatusSchema),
  contacsCtrls.updateStatusContact
);

module.exports = router;
