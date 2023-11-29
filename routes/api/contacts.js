const express = require("express");
const ctrl = require("../../controllers/contacts.js");
const { isValidId, validateBody } = require("../../mid-war");
const { schemas } = require("../../models/contact.js");
const router = express.Router();
// const {
//   listContacts,
//   getContactById,
//   // removeContact,
//   addContact,
//   updateContact,
// } = require("../../controllers/contacts.js");
// const ctrlWrapper = require("../../helpers/ctrlWrapper.js");

// const { isError } = require("joi");
router.get("/", ctrl.listContacts);

router.get("/:contactId", isValidId, ctrl.getContactById);

router.post("/", validateBody(schemas.addSchema), ctrl.addContact);

router.delete("/:contactId", isValidId, ctrl.removeContact);

router.put(
  "/:contactId",
  isValidId,
  validateBody(schemas.addSchema),
  ctrl.updateContact
);
router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  ctrl.updateStatusContact
);

module.exports = router;
