import express from "express";

import contactsController from "../../controllers/controllers.js";

import { isEmptyBody } from "../../middlewares/index.js";

import { validateBody } from "../../decorators/index.js";

import { contactsAddSchema } from "../../schemas/schemas.js";

const contactsAddValidate = validateBody(contactsAddSchema);

const contactsRouter = express.Router();

contactsRouter.get("/", contactsController.getAll);

contactsRouter.get("/:contactId", contactsController.getById);

contactsRouter.post(
  "/",
  isEmptyBody,
  contactsAddValidate,
  contactsController.post
);

contactsRouter.delete("/:contactId", contactsController.remove);

contactsRouter.put(
  "/:contactId",
  isEmptyBody,
  contactsAddValidate,
  contactsController.updateById
);

export default contactsRouter;
