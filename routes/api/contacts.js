const express = require("express");
const router = express.Router();

const {
  getListContacts,
  getContactById,
  deleteContact,
  createContact,
  updateContact,
  updateStatusContact,
} = require("../../controllers/contactsControllers");
// const isValidId = require("../../middlewares");

router.route("/").get(getListContacts).post(createContact);
router
  .route("/:contactId")
  .get(getContactById)
  .delete(deleteContact)
  .put(updateContact);
router.route("/:contactId/favorite").patch(updateStatusContact);

module.exports = router;
