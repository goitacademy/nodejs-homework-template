import express from "express";

import contactsController from "../../controllers/contacts-controller.js";
import contactSchemas from "../../schemas/contacts-schemas.js";
import { validateBody } from "../../decorator/index.js";
import {
  authenticate,
  isValidId,
  isEmptyBody,
  upload
} from "../../middlewars/index.js";

const contactsRouter = express.Router();

contactsRouter.use(authenticate);

contactsRouter.get("/", contactsController.getAll);

contactsRouter.get("/:id", isValidId, contactsController.getById);

contactsRouter.post(
  "/", upload.single('avatarURL'),
  isEmptyBody,
  validateBody(contactSchemas.addContactSchema),
  contactsController.add
);

contactsRouter.patch(
  "/:id",
  isEmptyBody,
  isValidId,
  validateBody(contactSchemas.addContactSchema),
  contactsController.updateById
);

contactsRouter.patch(
  "/:id/favorite",
  isEmptyBody,
  isValidId,
  validateBody(contactSchemas.contactUpdateFavoriteSchema),
  contactsController.updateStatusContact
);

contactsRouter.delete("/:id", isValidId, contactsController.deleteById);

export default contactsRouter;
