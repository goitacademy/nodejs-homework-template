const express = require("express");
const {
  getContactsController,
  getByIdController,
  addContactController,
  deleteContactController,
  updateContactController,
  updateContactStatusController,
} = require("../../controllers");
const {
  addContactValidateMiddleware,
  updateContactValidateMiddleware,
  validateUpdateContactStatus,
} = require("../../middlewares");
const { controllerWrapper } = require("../../helpers");

const router = express.Router();

router.get("/", controllerWrapper(getContactsController));

router.get("/:contactId", controllerWrapper(getByIdController));

router.post(
  "/",
  addContactValidateMiddleware,
  controllerWrapper(addContactController)
);

router.delete("/:contactId", controllerWrapper(deleteContactController));

router.put(
  "/:contactId",
  updateContactValidateMiddleware,
  controllerWrapper(updateContactController)
);

router.patch(
  "/:contactId",
  validateUpdateContactStatus,
  controllerWrapper(updateContactStatusController)
);

module.exports = { contactsRouter: router };
