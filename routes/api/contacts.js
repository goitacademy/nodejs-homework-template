const express = require("express");
const { schemas } = require("../../models/contact");

const { isValidId, validateBody } = require("../../middleware/index");

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateStatusContact,
} = require("../../controllers/contacts");

const router = express.Router();

router.get("/", listContacts);

router.get("/:contactId", isValidId, getContactById);

router.post("/", validateBody(schemas.addSchema), addContact);

router.delete("/:contactId", isValidId, removeContact);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  updateStatusContact
);

module.exports = router;
