import express from "express";
import contactsControllers from "../../controllers/contacts-controllers.js";
import { validateBody } from "../../decorators/validateBody.js";
import { authenticate } from "../../middlewares/authenticate.js";
import { isValidId } from "../../middlewares/isValidId.js";
import {
  addContactSchema,
  contactFavoriteSchema,
  updateContactSchema,
} from "../../validation-schemas/contacts-schemas.js";

export const contactsRouter = express.Router();

contactsRouter.use(authenticate);

contactsRouter
  .route("/")
  .get(contactsControllers.getAllContacts)
  .post(validateBody(addContactSchema), contactsControllers.addNewContact);

contactsRouter
  .route("/:contactId")
  .get(isValidId, contactsControllers.getContactById)
  .delete(isValidId, contactsControllers.deleteContactById)
  .put(
    validateBody(updateContactSchema),
    contactsControllers.updateContactById
  );

contactsRouter.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(contactFavoriteSchema),
  contactsControllers.updateContactById
);
