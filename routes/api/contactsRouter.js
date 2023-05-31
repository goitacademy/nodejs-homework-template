const express = require("express");
const { validateBody, isValidId } = require("../../middlewares");
const { contactsSchema, updateFavouriteSchema } = require("../../schemas/contactsSchema");


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
  .post(validateBody(contactsSchema), addNewContact);

router
  .route("/:contactId")
  .get(isValidId, getOneContact)
  .delete(deleteContact)
  .put(validateBody(contactsSchema), isValidId, updateContact);
  // .patch("/favourite", validateBody(updateFavouriteSchema), isValidId, updateFavourite)

module.exports = router;
