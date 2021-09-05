const express = require("express");
const router = express.Router();
const { joiContactSchema } = require("../../model");
const {
  validation,
  expressCtrlWrapper,
  authenticate,
} = require("../../validation");
const { contact } = require("../../controllers");

router.get(
  "/",
  expressCtrlWrapper(authenticate),
  expressCtrlWrapper(contact.getAllContacts)
);

router.get(
  "/:contactId",
  expressCtrlWrapper(authenticate),
  expressCtrlWrapper(contact.getByIdContact)
);

router.post(
  "/",
  expressCtrlWrapper(authenticate),
  validation(joiContactSchema),
  expressCtrlWrapper(contact.addContact)
);

router.delete(
  "/:contactId",
  expressCtrlWrapper(authenticate),
  expressCtrlWrapper(contact.removeContact)
);

router.patch(
  "/:contactId",
  expressCtrlWrapper(authenticate),
  expressCtrlWrapper(contact.updateContact)
);

router.patch(
  "/:contactId/favorite",
  expressCtrlWrapper(authenticate),
  expressCtrlWrapper(contact.updateContactStatus)
);

module.exports = router;
