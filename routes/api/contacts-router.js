import express from "express";

import contactsController from "../../controllers/contacts-controller.js";

import { validateBody } from "../../decorators/index.js";

import { isValidId } from "../../middlewares/index.js";

import {
  contactAddSchema,
  emptyBodySchema,
  updateStatusContactSchema,
  emptyFavoriteBodySchema,
} from "../../schemas/contacts-schemas.js";

const contactsRouter = express.Router();

contactsRouter.get("/", contactsController.getAll);

contactsRouter.get("/:id", isValidId, contactsController.getById);

contactsRouter.post(
  "/",
  validateBody(contactAddSchema),
  contactsController.add
);

contactsRouter.delete("/:id", isValidId, contactsController.deleteById);

contactsRouter.put(
  "/:id",
  isValidId,
  validateBody(emptyBodySchema),
  validateBody(contactAddSchema),
  contactsController.updateById
);

contactsRouter.patch(
  "/:id/favorite",
  isValidId,
  validateBody(emptyFavoriteBodySchema),
  validateBody(updateStatusContactSchema),
  contactsController.updateStatusContact
);

export default contactsRouter;
