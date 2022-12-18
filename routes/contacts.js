const express = require("express");

const {
  getAllContacts,
  getByIdContact,
  addContact,
  updateByIdContact,
  deleteByIdContact,
  updateByIdStatusContact,
} = require("../controllers/ctrlContacts");

const { ctrlWrapper } = require("../helpers");
const { validationBody, validationParams } = require("../middlewares");
const {
  isValidIdSchema,
  newContactSchema,
  updateContactSchema,
  updateStatusContactSchema,
} = require("../models/contacts/schemasJoi");

const router = new express.Router();

router.get("/", ctrlWrapper(getAllContacts));

router.get(
  "/:contactId",
  validationParams(isValidIdSchema),
  ctrlWrapper(getByIdContact)
);

router.post("/", validationBody(newContactSchema), ctrlWrapper(addContact));

router.put(
  "/:contactId",
  validationParams(isValidIdSchema),
  validationBody(updateContactSchema),
  ctrlWrapper(updateByIdContact)
);

router.delete(
  "/:contactId",
  validationParams(isValidIdSchema),
  ctrlWrapper(deleteByIdContact)
);

router.patch(
  "/:contactId/favorite",
  validationParams(isValidIdSchema),
  validationBody(updateStatusContactSchema),
  ctrlWrapper(updateByIdStatusContact)
);

module.exports = router;
