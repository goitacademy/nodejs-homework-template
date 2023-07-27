import express from "express";

import { validateBody } from "../../decorators/index.js";
import { isEmptyBody, isValidId } from "../../middlewars/index.js";

import contactsController from "../../controllers/contacts-controller.js";
import schemas from "../../models/contacts.js";

const contactsRouter = express.Router();

contactsRouter.get("/", contactsController.getAll);

contactsRouter.get("/:contactId", isValidId, contactsController.getById);

contactsRouter.post(
  "/",
  isEmptyBody,
  validateBody(schemas.contactsAddSchema),
  contactsController.add
);

contactsRouter.put(
  "/:contactId",
  isValidId,
  isEmptyBody,
  validateBody(schemas.contactsAddSchema),
  contactsController.updateById
);

contactsRouter.delete("/:contactId", isValidId, contactsController.removeById);
contactsRouter.patch(
  "/:contactId/favorite",
  isValidId,
  isEmptyBody,
  validateBody(schemas.updateFavoriteSchema),
  contactsController.updateStatusContact
);

export default contactsRouter;
