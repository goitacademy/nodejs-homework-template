import express from "express";
import contactsController from "../../controllers/contacts-controllers/contacts-controller.js";
import { contactsSchemas } from "../../schemas/index.js";
import { validateBody } from "../../decorator/index.js";
import {
  authenticate,
  isValidId,
  isEmptyBody,
  upload,
} from "../../middlewars/index.js";

const contactsRouter = express.Router();

contactsRouter.use(authenticate);

contactsRouter.get("/", contactsController.getAll);

contactsRouter.get("/:id", isValidId, contactsController.getById);

contactsRouter.post(
  "/",
  upload.single("avatarURL"),
  isEmptyBody,
  validateBody(contactsSchemas.addContactSchema),
  contactsController.add
);

contactsRouter.patch(
  "/:id",
  isEmptyBody,
  isValidId,
  validateBody(contactsSchemas.addContactSchema),
  contactsController.updateById
);

contactsRouter.patch(
  "/:id/favorite",
  isEmptyBody,
  isValidId,
  validateBody(contactsSchemas.contactUpdateFavoriteSchema),
  contactsController.updateStatusContact
);

contactsRouter.delete("/:id", isValidId, contactsController.deleteById);

export default contactsRouter;
