const express = require("express");

const router = express.Router();

const { isValidId } = require("../../utils");

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
} = require("../../controller/index.js");

router.route("/").post(addContact).get(listContacts);

router.use("/:id", isValidId);

router
  .route("/:id")
  .get(isValidId, getContactById)
  .put(isValidId, updateContact)
  .delete(isValidId, removeContact);

router.route("/:id/favorite").patch(isValidId, updateStatusContact);

module.exports = router;
