import express from "express";

import contactsController from "../../controllers/contacts-controller.js";

import {
  authenticate,
  isEmptyBody,
  isValidId,
  isEmptyFavoriteFeils,
} from "../../middlewares/index.js";

import validateBody from "../../decorators/validateBody.js";

import contactsSchema from "../../schemas/contacts-schemas-JOI.js";

const contactsRouter = express.Router();

contactsRouter.use(authenticate);

contactsRouter.get("/", contactsController.getAll);

contactsRouter.get("/:contactId", isValidId, contactsController.getById);

contactsRouter.post(
  "/",
  isEmptyBody,
  validateBody(contactsSchema.contactAddSchema),
  contactsController.add
);

contactsRouter.put(
  "/:contactId",
  isValidId,
  isEmptyBody,
  validateBody(contactsSchema.contactAddSchema),
  contactsController.updateById
);

contactsRouter.patch(
  "/:contactId/favorite",
  isValidId,
  isEmptyFavoriteFeils,
  validateBody(contactsSchema.contactUpdateFavoriteSchema),
  contactsController.updateStatusContact
);

contactsRouter.delete("/:contactId", isValidId, contactsController.removeById);

export default contactsRouter;
