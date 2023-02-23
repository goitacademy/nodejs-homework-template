const express = require('express')
const contactsRouter = express.Router();

const {
  addValidation,
  updateValidation,
  statusValidation,
} = require("../../middlewares/validationContacts");

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatus,
} = require("../../сontrollers/contactsControllers");

const controllerError = require("../../сontrollers/controllerError")
const authorization = require("../../middlewares/authorization");

contactsRouter.use(authorization);

contactsRouter.get("/", controllerError(listContacts));

contactsRouter.get("/:contactId", controllerError(getContactById));

contactsRouter.post("/", addValidation, controllerError(addContact));

contactsRouter.delete("/:contactId", controllerError(removeContact));

contactsRouter.put(
  "/:contactId",
  updateValidation,
  controllerError(updateContact)
);

contactsRouter.patch(
  "/:contactId/favorite",
  statusValidation,
  controllerError(updateStatus)
);

module.exports = contactsRouter;
