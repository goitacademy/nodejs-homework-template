import express from "express";

import contactsController from "../../Controllers/contacts-controller.js";

import { validateBody } from "../../decorators/index.js";

import {
  contactAddSchema,
  emptyBodySchema,
} from "../../schemas/contacts-schemas.js";

const contactsRouter = express.Router();

contactsRouter.get("/", contactsController.getAll);

contactsRouter.get("/:id", contactsController.getById);

contactsRouter.post(
  "/",
  validateBody(contactAddSchema),
  contactsController.add
);

contactsRouter.delete("/:id", contactsController.deleteById);

contactsRouter.put(
  "/:id",
  validateBody(emptyBodySchema),
  validateBody(contactAddSchema),
  contactsController.updateById
);

export default contactsRouter;
