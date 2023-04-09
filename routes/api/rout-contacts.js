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
} = require("../../middleware");

const isValidId = require("../../helpers/validatinId");
router.get("/", getContacts);

router.get("/:id", isValidId, getContact);

router.post("/", validateCreateContact, createContact);

router.put("/:id", isValidId, validateUpdateContact, updateContact);

router.patch(
  "/:id/favorite",
  isValidId,
  validateUpdateStatusContact,
  updateStatusContact
);

router.delete("/:id", isValidId, deleteContact);

module.exports = router;
