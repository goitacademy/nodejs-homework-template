const express = require("express");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateContactStatus,
} = require("../../controllers");
const { ctrlWrapper, validateBody } = require("../../helpers");
const { contactJoiSchema } = require("../../models");
const { isValidId, userAuth } = require("../../middlewares");

const router = express.Router();

router.get("/", userAuth, ctrlWrapper(listContacts));

router.get("/:contactId", userAuth, isValidId, ctrlWrapper(getContactById));

router.post(
  "/",
  userAuth,
  validateBody(contactJoiSchema),
  ctrlWrapper(addContact)
);

router.delete("/:contactId", userAuth, isValidId, ctrlWrapper(removeContact));

router.put(
  "/:contactId",
  userAuth,
  isValidId,
  validateBody(contactJoiSchema),
  ctrlWrapper(updateContact)
);

router.patch(
  "/:contactId",
  userAuth,
  isValidId,
  ctrlWrapper(updateContactStatus)
);

module.exports = router;
