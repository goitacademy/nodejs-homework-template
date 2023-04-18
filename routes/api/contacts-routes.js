const express = require("express");
const router = express.Router();
const {
  getAllContacts,
  getOneContact,
  addNewContact,
  deleteContact,
  changeContact,
  changeFavorite,
} = require("../../controllers/contacts-controllers");

const {
  validateAddContact,
  validateChangeContact,
} = require("../../utils/validateBody");

const {
  addContactSchema,
  editContactSchema,
  editFavoriteSchema,
} = require("../../models/contact");

const isValiId = require("../../middlewares/isValidId");

/**
  Routes----------------------------------------------------------------------
*/

router.get("/", getAllContacts);

router.get("/:contactId", isValiId, getOneContact);

router.post("/", validateAddContact(addContactSchema), addNewContact);

router.delete("/:contactId", isValiId, deleteContact);

router.put(
  "/:contactId",
  isValiId,
  validateChangeContact(editContactSchema),
  changeContact
);

router.patch(
  "/:contactId/favorite",
  isValiId,
  validateChangeContact(editFavoriteSchema),
  changeFavorite
);

module.exports = router;
