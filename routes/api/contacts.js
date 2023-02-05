const express = require("express");
const {
  getContactsController,
  getContactByIdController,
  postContactController,
  deleteContactController,
  changeContactController,
  changeFavoriteStatusController,
} = require("../../controllers/contacts");
const { asyncWrapper } = require("../../helpers/apiHelpers");
const auth = require("../../middlewares/auth");
const {
  addContactValidation,
  patchValidation,
  getContactValidation,
  changeContactValidation,
} = require("../../middlewares/validationMiddleware");

const routers = express.Router();

routers.use(auth);

routers.get("/", asyncWrapper(getContactsController));

routers.get(
  "/:contactId",
  getContactValidation,
  asyncWrapper(getContactByIdController)
);

routers.post("/", addContactValidation, asyncWrapper(postContactController));

routers.delete(
  "/:contactId",
  getContactValidation,
  asyncWrapper(deleteContactController)
);

routers.put(
  "/:contactId",
  changeContactValidation,
  asyncWrapper(changeContactController)
);

routers.patch(
  "/:contactId/favorite",
  patchValidation,
  asyncWrapper(changeFavoriteStatusController)
);

module.exports = routers;
