const express = require("express");

// const { ctrl } = require("../../controllers/index");
const {
  getContactList,
  getContactById,
  addContact,
  updateFavorite,
  deleteContact,
  updateContact,
} = require("../../controllers/index");
const { validateBody, isValidId } = require("../../middlewares");
const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", getContactList.getContactList);

router.get("/:contactId", isValidId, getContactById.getContactById);

router.post("/", validateBody(schemas.addSchema), addContact.addContact);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  updateFavorite.updateFavorite
);

router.delete("/:contactId", isValidId, deleteContact.deleteContact);

router.put(
  "/:contactId",
  isValidId,
  validateBody(schemas.addSchema),
  updateContact.updateContact
);

module.exports = router;
