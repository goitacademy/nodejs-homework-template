import express from "express";

import contactsSchemas from "../../schemas/contactsSchemas.js";
import { validateBody } from "../../decorators/index.js";
import { isEmptyBody } from "../../middlewars/index.js";

import contactsController from "../../controllers/contacts-controller.js";

const contactsRouter = express.Router();

contactsRouter.get("/", contactsController.getAll);

contactsRouter.get("/:contactId", contactsController.getById);

contactsRouter.post(
  "/",
  isEmptyBody,
  validateBody(contactsSchemas.contactsAddSchema),
  contactsController.add
);

contactsRouter.put(
  "/:contactId",
  isEmptyBody,
  validateBody(contactsSchemas.contactsAddSchema),
  contactsController.updateById
);

contactsRouter.delete("/:contactId", contactsController.removeById);

export default contactsRouter;
