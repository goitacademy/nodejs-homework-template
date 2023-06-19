const express = require("express");
const {
  getContactsList,
  getContactById,
  createContact,
  deleteContactById,
  updateContactById,
} = require("../../controllers/contactsController");

const router = express.Router();

router.route("/").post(createContact).get(getContactsList);

router.route("/:contactId").get(getContactById).patch(updateContactById).delete(deleteContactById);

module.exports = router;
