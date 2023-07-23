const express = require("express");

const router = express.Router();

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  checkContact,
} = require("../../models/contacts");

router.route("/").post(addContact).get(listContacts);

router.use("/:id", checkContact);
router
  .route("/:id")
  .get(getContactById)
  .put(updateContact)
  .delete(removeContact);

module.exports = router;
