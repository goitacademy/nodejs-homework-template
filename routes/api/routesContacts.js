const express = require("express");

const router = express.Router();

const {
  getContacts,
  getContact,
  createContact,
  updateContact,
  updateStatusContact,
  deleteContact,
} = require("../../controllers");

const {
  validateCreateContact,
  validateUpdateContact,
  validateUpdateStatusContact,
  isValidId,
  authenticate,
} = require("../../middleware");

// const isValidId = require("../../middleware/validateId");

router.get("/", authenticate, getContacts);

router.get("/:id", authenticate, getContact);

router.post("/", authenticate, validateCreateContact, createContact);

router.put(
  "/:id",
  authenticate,
  isValidId,
  validateUpdateContact,
  updateContact
);

router.patch(
  "/:id/favorite",
  authenticate,
  isValidId,
  validateUpdateStatusContact,
  updateStatusContact
);

router.delete("/:id", authenticate, isValidId, deleteContact);

module.exports = router;
