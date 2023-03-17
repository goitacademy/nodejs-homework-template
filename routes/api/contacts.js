const express = require("express");
const router = express.Router();

const {
  validation,
} = require("../../middlewares/validation/validationMiddleware");

const {
  contactJoiSchema,
  favoriteJoiSchema,
} = require("../../middlewares/validation/validationSchema");

const { asyncWrapper } = require("../../helpers/apiHelpers");

const {
  getContactsController,
  getContactController,
  createContactController,
  updateContactController,
  updateStatusContactController,
  deleteContactController,
} = require("../../controllers/contactsController");

router
  .route("/")
  .get(asyncWrapper(getContactsController))
  .post(validation(contactJoiSchema), asyncWrapper(createContactController));

router
  .route("/:contactId")
  .get(asyncWrapper(getContactController))
  .put(validation(contactJoiSchema), asyncWrapper(updateContactController))
  .delete(asyncWrapper(deleteContactController));

router
  .route("/:contactId/favorite")
  .patch(
    validation(favoriteJoiSchema),
    asyncWrapper(updateStatusContactController)
  );

module.exports = {
  router,
};
