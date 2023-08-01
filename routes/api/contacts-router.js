import express from "express";
import contactsController from "../../controllers/index.js";
import contactsSchemas from "../../schemes/contacts-schemas.js";
import { validateBody } from "../../decorators/index.js";
import {authenticate, isEmptyBody, isValidId } from "../../middlewars/index.js";

const contactsRouter = express.Router();

contactsRouter.use(authenticate);

contactsRouter.get("/", contactsController.getAll);

contactsRouter.get(
  "/:id",
  isValidId,
  validateBody(contactsSchemas.contactsAddSchema),
  contactsController.getById
);

contactsRouter.post(
  "/",
  isEmptyBody,
  validateBody(contactsSchemas.contactsAddSchema),
  contactsController.add
);

contactsRouter.delete(
  "/:id",
  isValidId,
  validateBody(contactsSchemas.contactsAddSchema),
  contactsController.deleteById
);

contactsRouter.put(
  "/:id",
  isValidId,
  isEmptyBody,
  validateBody(contactsSchemas.contactsAddSchema),
  contactsController.updateById
);

contactsRouter.patch(
  "/:id/favorite",
  isValidId,
  isEmptyBody,
  validateBody(contactsSchemas.contactUpdateFavoriteSchema),
  contactsController.updateFavorite
);

export default contactsRouter;
