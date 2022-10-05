const express = require("express");
const router = express.Router();
const {
  getContactsController,
  addContactController,
  getContactByIdController,
  deleteContactByIdController,
  putContactByIdController,
  updateStatusContactController,
} = require("../../controllers/contactsController");
const {
  addContactValidation,
  putContactValidation,
  updateStatusValidation,
} = require("../../middlewares/validationMiddleware");
const { asyncWrapper } = require("../../helpers/apiHelpes");

router
  .route("/")
  .get(asyncWrapper(getContactsController))
  .post(addContactValidation, asyncWrapper(addContactController));

router
  .route("/:contactId")
  .get(asyncWrapper(getContactByIdController))
  .delete(asyncWrapper(deleteContactByIdController))
  .put(putContactValidation, asyncWrapper(putContactByIdController));

router
  .route("/:contactId/favorite")
  .patch(updateStatusValidation, asyncWrapper(updateStatusContactController));
module.exports = router;
