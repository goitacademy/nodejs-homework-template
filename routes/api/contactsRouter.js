import express from "express";

import contactsController from "../../controllers/contacts-controller.js";
import contactsSchemas from "../../schemas/contacts-schemas.js";
import validateBody from "../../decorators/validateBody.js";

import isValidId from "../../middlewars/isValidId.js";
import isEmptyBody from "../../middlewars/isEmptyBody.js";
import authenticate from "../../middlewars/authenticate.js";

export const contactsRouter = express.Router();
contactsRouter.use(authenticate);

contactsRouter.get("/", contactsController.getAll);

contactsRouter.get("/:contactId", isValidId, contactsController.getById);

contactsRouter.post(
  "/",
  isEmptyBody,
  validateBody(contactsSchemas.contactsAddSchema),
  contactsController.add
);

contactsRouter.put(
  "/:contactId",
  isEmptyBody,
  isValidId,
  validateBody(contactsSchemas.contactsAddSchema),
  contactsController.updateById
);
contactsRouter.patch(
  "/:contactId/favorite",
  isEmptyBody,
  isValidId,
  validateBody(contactsSchemas.contactsUpdateFavoriteSchema),
  contactsController.updateById
);

contactsRouter.delete("/:contactId", isValidId, contactsController.deleteById);
