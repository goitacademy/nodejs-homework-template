const express = require("express");
const { validateBody } = require("../../middlewares");
const { contactsSchema } = require("../../schemas/contactsSchema");

const {
  getListContacts,
  getOneContact,
  addNewContact,
  deleteContact,
  updateContact,
} = require("../../controllers/contactsControllers");

const router = express.Router();

router
  .route("/")
  .get(getListContacts)
  // .post(validateBody(contactsSchema), addNewContact);

// router
//   .route("/:contactId")
//   .get(getOneContact)
//   .delete(deleteContact)
//   .put(validateBody(contactsSchema), updateContact);

module.exports = router;
