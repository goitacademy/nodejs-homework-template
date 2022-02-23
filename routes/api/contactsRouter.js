const express = require("express");

const {
  postValidationContact,
  putBodyValidation,
  putValidationContact,
  patchBodyValidation,
  patchValidationContact,
} = require("../../middlewares/contactValidation");

const { asyncWrapper } = require("../../helpers/apiHelpers");

const {
  getContactsController,
  getContactByIdController,
  addPostController,
  changePostController,
  patchPostController,
  removePostController,
} = require("../../controllers/contactsController");

const contactsRouter = express.Router();

contactsRouter.get("/", asyncWrapper(getContactsController));
contactsRouter.get("/:contactId", asyncWrapper(getContactByIdController));
contactsRouter.post(
  "/",
  postValidationContact,
  asyncWrapper(addPostController)
);
contactsRouter.put(
  "/:contactId",
  putBodyValidation,
  putValidationContact,
  asyncWrapper(changePostController)
);
contactsRouter.patch(
  "/:contactId/favorite",
  patchBodyValidation,
  patchValidationContact,
  asyncWrapper(patchPostController)
);
contactsRouter.delete("/:contactId", asyncWrapper(removePostController));

module.exports = contactsRouter;
