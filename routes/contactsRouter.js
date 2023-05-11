const express = require("express");
const router = express.Router();

const {
  getContacts,
  getContact,
  removeContact,
  addContact,
  updateContact,
} = require("../controllers/controllers");

router.route("/").get(getContacts).post(addContact);
router
  .route("/:contactId")
  .get(getContact)
  .put(updateContact)
  .delete(removeContact);

module.exports = router;
