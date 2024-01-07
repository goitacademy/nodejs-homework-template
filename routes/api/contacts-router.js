import express from "express";
import contactsController from "../../controllers/contacts-controller.js";
import {
  addContactScheme,
  updateContactScheme,
} from "../../schemas/contact-schemas.js";

import { isEmptyBody } from "../../middlwares/index.js";
import { validateBody } from "../../decorators/index.js";

const contactsRouter = express.Router();

contactsRouter.get("/", contactsController.getAll);

contactsRouter.get("/:id", contactsController.getById);

contactsRouter.post(
  "/",
  isEmptyBody,
  validateBody(addContactScheme),
  contactsController.add
);

contactsRouter.put(
  "/:id",
  isEmptyBody,
  validateBody(updateContactScheme),
  contactsController.updateById
);

contactsRouter.delete("/:id", contactsController.deleteById);

export default contactsRouter;
