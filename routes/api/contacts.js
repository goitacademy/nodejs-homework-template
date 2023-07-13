const express = require("express");
const router = express.Router();
const { authenticate } = require("../../middlewares");

const {
  getListContacts,
  getContactById,
  deleteContact,
  createContact,
  updateContact,
  updateStatusContact,
} = require("../../controllers/contactsControllers");

router
  .route("/")
  .get(authenticate, getListContacts)
  .post(authenticate, createContact);
router
  .route("/:contactId")
  .get(authenticate, getContactById)
  .delete(authenticate, deleteContact)
  .put(authenticate, updateContact);
router.route("/:contactId/favorite").patch(updateStatusContact);

module.exports = router;
