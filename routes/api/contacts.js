const express = require("express");
const {
  getAllContacts,
  getContact,
  deleteContact,
  addNewContact,
  updatedContact,
} = require("../../controllers/contactControllers");

const router = express.Router();

router.route("/").get(getAllContacts).post(addNewContact);
router
  .route("/:contactId")
  .get(getContact)
  .delete(deleteContact)
  .put(updatedContact);

module.exports = router;
