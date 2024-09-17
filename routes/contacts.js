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
const {
  authenticate,
  validateBody,
  validateParams,
} = require("../middlewares");
const {
  isValidIdSchema,
  newContactSchema,
  updateContactSchema,
  updateStatusContactSchema,
} = require("../models/contact/schemasJoi");

const router = new express.Router();

router.get("/", authenticate, ctrlWrapper(getAllContacts));

router.get(
  "/:contactId",
  authenticate,
  validateParams(isValidIdSchema),
  ctrlWrapper(getByIdContact)
);

router.post(
  "/",
  authenticate,
  validateBody(newContactSchema),
  ctrlWrapper(addContact)
);

router.put(
  "/:contactId",
  authenticate,
  validateParams(isValidIdSchema),
  validateBody(updateContactSchema),
  ctrlWrapper(updateByIdContact)
);

router.delete(
  "/:contactId",
  authenticate,
  validateParams(isValidIdSchema),
  ctrlWrapper(deleteByIdContact)
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  validateParams(isValidIdSchema),
  validateBody(updateStatusContactSchema),
  ctrlWrapper(updateByIdStatusContact)
);

module.exports = router;