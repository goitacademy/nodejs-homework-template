const express = require("express");

const tryCatchWrapper = require("../../utils/controllerWrapper.js");
const {auth} = require("../../utils/auth.js");

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateFavorite,
} = require("../../controllers/contacts");

const router = express.Router();

router.get("/", auth, tryCatchWrapper(listContacts));

router.get("/:contactId", auth, tryCatchWrapper(getContactById));

router.post("/", auth, tryCatchWrapper(addContact));

router.delete("/:contactId", auth, tryCatchWrapper(removeContact));

router.put("/:contactId", auth, tryCatchWrapper(updateContact));

router.patch("/:contactId/favorite", auth, tryCatchWrapper(updateFavorite));

module.exports = router;
