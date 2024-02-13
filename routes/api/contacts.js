const express = require("express");

const {
  addContactScheme,
  putContactScheme,
  updFavScheme,
} = require("../../schemas");
const { isValidId, validation } = require("../../middlewares");

const validationMiddlewareAdd = validation(addContactScheme);
const validationMiddlewarePut = validation(putContactScheme);
const validationMiddlewareUpdFav = validation(updFavScheme);

const { contacts } = require("../../controllers");

const router = express.Router();

router.get("/", contacts.getContacts);

router.get("/:contactId", isValidId, contacts.getContactsById);

router.post("/", validationMiddlewareAdd, contacts.addNewContact);

router.delete("/:contactId", isValidId, contacts.deleteContact);

router.put(
  "/:contactId",
  isValidId,
  validationMiddlewarePut,
  contacts.updateContact
);
router.patch(
  "/:contactId/favorite",
  isValidId,
  validationMiddlewareUpdFav,
  contacts.updateFav
);

module.exports = router;
