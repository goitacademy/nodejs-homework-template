import express from "express";

import contactsController from "../../controllers/contacts-controller.js";
import contactSchemas from "../../schemas/contacts-schemas.js";
import { validateBody } from "../../decorator/index.js";
import {isValidId} from "../../middlewars/index.js";
const contactsRouter = express.Router();

contactsRouter.get("/", contactsController.getAll);

contactsRouter.get("/:id", isValidId, contactsController.getById);

contactsRouter.post(
  "/",
  validateBody(contactSchemas.addContactSchema),
  contactsController.add
);

contactsRouter.patch(
  "/:id",
  isValidId,
  validateBody(contactSchemas.addContactSchema),
  contactsController.updateById
);

contactsRouter.patch(
  "/:id/favorite",
  isValidId,
  validateBody(contactSchemas.contactUpdateFavoriteSchema),
  contactsController.updateStatusContact
);

contactsRouter.delete("/:id", isValidId, contactsController.deleteById);

export default contactsRouter;
