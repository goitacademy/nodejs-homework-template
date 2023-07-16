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
  // getContactsByFavorite,
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

// router.route("?favorite=true").get(authenticate, getContactsByFavorite);

router.route("/:contactId/favorite").patch(updateStatusContact);

module.exports = router;
