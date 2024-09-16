import express from "express";

import { controllerContact } from "../../controllers/index.js";
import { validationContact } from "../../middleware/validation/index.js";
import { isValidId, authenticate } from "../../middleware/index.js";

const contactrouter = express.Router();

contactrouter.use(authenticate);

contactrouter.get("/", controllerContact.getAllContacts);

contactrouter.get("/:contactId", isValidId, controllerContact.getContactById);

contactrouter.post(
  "/",
  validationContact.addContactValidate,
  controllerContact.addContact
);

contactrouter.delete("/:contactId", isValidId, controllerContact.removeContact);

contactrouter.put(
  "/:contactId",
  isValidId,
  validationContact.addContactValidate,
  controllerContact.updateContact
);

contactrouter.patch(
  "/:contactId/favorite",
  isValidId,
  validationContact.contactUpdateFavoriteValidate,
  controllerContact.updateContact
);

export default contactrouter;
