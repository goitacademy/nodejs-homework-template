import express from "express";

import contactsController from "../../controllers/contacts-controller.js";
import {
  isEmptyBody,
  isEmptyBodyFavorite,
  isValidId,
} from "../../middlewares/index.js";
import {validateBody} from "../../decorators/index.js";
import {
  contactAddShema,
  contactUpdateFavoriteShema,
  contactUpdateShema,
} from "../../models/Contact.js";

const contactsRouter = express.Router();

contactsRouter.get("/", contactsController.listContacts);

contactsRouter.get("/:contactId", isValidId, contactsController.contactById);

contactsRouter.post(
  "/",
  isEmptyBody,
  validateBody(contactAddShema),
  contactsController.addContact
);

contactsRouter.delete(
  "/:contactId",
  isValidId,
  contactsController.removeContact
);

contactsRouter.put(
  "/:contactId",
  isValidId,
  isEmptyBody,
  validateBody(contactUpdateShema),
  contactsController.updateContact
);

contactsRouter.patch(
  "/:contactId/favorite",
  isValidId,
  isEmptyBodyFavorite,
  validateBody(contactUpdateFavoriteShema),
  contactsController.updateStatusContact
);

export default contactsRouter;
