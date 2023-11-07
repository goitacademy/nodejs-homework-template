/** @format */

import express from "express";

import contactsController from "../../controllers/contacts-controller.js";

import { validateBody } from "../../decorators/index.js";

import {
  contactAddSchema,
  // contactUpdateSchema,
} from "../../schemas/contact-schemas.js";

const contactsRouter = express.Router();

contactsRouter.get("/", contactsController.getAll);

contactsRouter.get("/:id", contactsController.getById);

contactsRouter.post(
  "/",
  validateBody(contactAddSchema),
  contactsController.add
);

contactsRouter.put(
  "/:id",
  // validateBody(contactUpdateSchema),
  contactsController.updateById
);

contactsRouter.delete("/:id", contactsController.deleteById);

export default contactsRouter;
