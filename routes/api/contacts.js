const express = require("express");
const { isValid, validBody, isEmpty } = require("../../middlewares");
const { schema, upgradeFavoriteSchema } = require("../../schema/schema");
const router = express.Router();
const {
  getListContacts,
  getContactId,
  addContact,
  delContact,
  updateContact,
  updateFavoriteContact,
} = require("../../controllers/contacts");

router.get("/", getListContacts);

router.get("/:id", isValid, getContactId);

router.post("/", validBody(schema), addContact);

router.delete("/:id", isValid, delContact);

router.put(
  "/:id",
  isValid,
  isEmpty.isEmptyBody,
  validBody(schema),
  updateContact
);

router.patch(
  "/:id/favorite",
  isValid,
  isEmpty.isEmptyFavorite,
  validBody(upgradeFavoriteSchema),
  updateFavoriteContact
);

module.exports = router;
