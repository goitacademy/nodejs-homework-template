const express = require("express");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateFavorite,
} = require("../../controllers/contacts");

const { schemas } = require("../../models/contact");

const { validateBody } = require("../../middlewares/validateBody");
const { isValidId } = require("../../middlewares/isValidId");

const router = express.Router();

router.get("/", listContacts);

router.get("/:contactId", isValidId, getContactById);

router.post("/", validateBody(schemas.addSchema), addContact);

router.delete("/:contactId", isValidId, removeContact);

router.put(
  "/:contactId",
  isValidId,
  validateBody(schemas.putSchema),
  updateContact
);
router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(schemas.favoriteSchema),
  updateFavorite
);

module.exports = router;
