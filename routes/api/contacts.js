const express = require("express");
const { ctrlWrapper } = require("../../helpers");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContactID,
  updateFavoriteSchema,
} = require("../../controllers/contacts");

const { schemas } = require("../../models/contact");

const { validateBody, isValidId } = require("../../middelwares");

const router = express.Router();

router.get("/", ctrlWrapper(listContacts));

router.get("/:contactId", isValidId, ctrlWrapper(getContactById));

router.post("/", validateBody(schemas.addSchema), ctrlWrapper(addContact));

router.delete("/:contactId", isValidId, ctrlWrapper(removeContact));

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  ctrlWrapper(updateFavoriteSchema)
);

router.put(
  "/:contactId",
  isValidId,
  validateBody(schemas.addSchema),
  ctrlWrapper(updateContactID)
);

module.exports = router;
