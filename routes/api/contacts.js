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
const isValidToken = require("../../middlewares/isValidToken");

const router = express.Router();

router.get("/", isValidToken, listContacts);

router.get("/:contactId", isValidToken, isValidId, getContactById);

router.post("/", isValidToken, validateBody(schemas.addSchema), addContact);

router.delete("/:contactId", isValidToken, isValidId, removeContact);

router.put(
  "/:contactId",
  isValidToken,
  isValidId,
  validateBody(schemas.putSchema),
  updateContact
);
router.patch(
  "/:contactId/favorite",
  isValidToken,
  isValidId,
  validateBody(schemas.favoriteSchema),
  updateFavorite
);

module.exports = router;
