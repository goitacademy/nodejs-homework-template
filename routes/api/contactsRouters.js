const express = require("express");
// const fs = require("fs").promises;
const path = require("path");

const tryCatchWrapper = require("../../utils/controllerWrapper");

const {
  joiValidation,
  joiValidationRequired,
  joiFavorite,
} = require("../../utils/joiValidation");

const requestError = require("../../utils/requestError.js");

const {
} = require("../../controllers/contacts.js");

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateFavorite
  } = require("../../controllers/contacts/index.js")

const router = express.Router();

router.get("/", tryCatchWrapper(listContacts));

router.get("/:contactId", tryCatchWrapper(getContactById));

router.post("/", tryCatchWrapper(addContact));

router.delete("/:contactId", tryCatchWrapper(removeContact));

router.put("/:contactId", tryCatchWrapper(updateContact));

router.patch("/:contactId/favorite", tryCatchWrapper(updateFavorite));

module.exports = router;
