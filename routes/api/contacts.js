const express = require("express");

const router = express.Router();

const {
  getContacts,
  getContact,
  createContact,
  deleteContact,
  updateContact,
  updateStatusContact,
} = require("../../controllers/contacts");
const validateBody = require("../../utils/validateBody");
const { schemas } = require("../../models/contact");
const { isValidId, authenticate } = require("../../middlewares");

router.get("/", authenticate, getContacts);
router.get("/:contactId", authenticate, isValidId, getContact);
router.post(
  "/",
  authenticate,
  validateBody(schemas.createContactSchema),
  createContact
);
router.delete("/:contactId", authenticate, isValidId, deleteContact);
router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateBody(schemas.updateContactSchema),
  updateContact
);
router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateBody(schemas.updateStatusContactSchema),
  updateStatusContact
);

module.exports = router;
