const express = require("express");

const {
  addContactScheme,
  putContactScheme,
  updFavScheme,
} = require("../../schemas");
const { isValidId, validation, authenticate } = require("../../middlewares");

const validationMiddlewareAdd = validation(addContactScheme);
const validationMiddlewarePut = validation(putContactScheme);
const validationMiddlewareUpdFav = validation(updFavScheme);

const { contacts } = require("../../controllers");

const router = express.Router();

router.get("/", authenticate, contacts.getContacts);

router.get("/:contactId", authenticate, isValidId, contacts.getContactsById);

router.post("/", authenticate, validationMiddlewareAdd, contacts.addNewContact);

router.delete("/:contactId", authenticate, isValidId, contacts.deleteContact);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validationMiddlewarePut,
  contacts.updateContact
);
router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validationMiddlewareUpdFav,
  contacts.updateFav
);

module.exports = router;
