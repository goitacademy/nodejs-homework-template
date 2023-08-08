import express from "express";

import { validateBody } from "../../decorators/index.js";
import {
  authenticate,
  isEmptyBody,
  isValidId,
} from "../../middlewars/index.js";

import contactsController from "../../controllers/contacts-controller.js";
import schemas from "../../models/contacts.js";

const contactsRouter = express.Router();

contactsRouter.get("/", authenticate, contactsController.getAll);

contactsRouter.get(
  "/:contactId",
  authenticate,
  isValidId,
  contactsController.getById
);

contactsRouter.post(
  "/",
  authenticate,
  isEmptyBody,
  validateBody(schemas.contactsAddSchema),
  contactsController.add
);

contactsRouter.put(
  "/:contactId",
  authenticate,
  isValidId,
  isEmptyBody,
  validateBody(schemas.contactsAddSchema),
  contactsController.updateById
);

contactsRouter.delete(
  "/:contactId",
  authenticate,
  isValidId,
  contactsController.removeById
);
contactsRouter.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  isEmptyBody,
  validateBody(schemas.updateFavoriteSchema),
  contactsController.updateStatusContact
);

export default contactsRouter;
