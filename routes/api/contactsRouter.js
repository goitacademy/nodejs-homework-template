const express = require("express");
const { validateBody, isValidId } = require("../../middlewares");
const { contactsSchema, updateFavoriteSchema } = require("../../schemas/contactsSchema");


const {
  getListContacts,
  getOneContact,
  addNewContact,
  deleteContact,
  updateContact,
   updateFavorite,
} = require("../../controllers/contactsControllers");

const router = express.Router();

router
  .route("/")
  .get(getListContacts)
  .post(validateBody(contactsSchema), addNewContact);

router
  .route("/:contactId")
  .get(getOneContact)
  .delete(isValidId, deleteContact)
  .put(validateBody(contactsSchema), updateContact)



router
  .route("/:id/favorite")
  .patch(validateBody(updateFavoriteSchema), updateFavorite);
 

module.exports = router;
