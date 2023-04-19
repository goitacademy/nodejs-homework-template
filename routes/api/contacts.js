const express = require("express");
const { contacsCtrls } = require("../../controllers");
const { contactsSchemas } = require("../../models");
const { validateBody, isBody, isValidId, authenticate, checkOwnership } = require("../../middlewares");

const router = express.Router();

router.get("/", authenticate, contacsCtrls.listContacts);

router.get("/:contactId", authenticate, isValidId, contacsCtrls.getById);

router.post("/", authenticate, validateBody(contactsSchemas.addSchema), contacsCtrls.addContact);

router.delete("/:contactId", authenticate, checkOwnership, isValidId, contacsCtrls.deleteContact);

router.put("/:contactId", authenticate, checkOwnership, isValidId, isBody, validateBody(contactsSchemas.updSchema), contacsCtrls.updateContact);

router.patch(
  "/:contactId/favorite",
  authenticate,
  checkOwnership,
  isValidId,
  isBody,
  validateBody(contactsSchemas.updStatusSchema),
  contacsCtrls.updateStatusContact
);

module.exports = router;
