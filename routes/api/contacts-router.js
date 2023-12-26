import express from "express";
import contactsController from "../../controllers/contacts-controller.js";
import {
  isEmptyBody,
  isValidId,
  isEmptyBodyForFavorites,
  authenticate,
  upload,
} from "../../middlewares/index.js";
import { validateBody } from "../../decorators/index.js";

import {
  contactAddSchema,
  contactUpdateSchema,
  contactAvatarSchema,
} from "../../models/Contact.js";

const contactsRouter = express.Router();

contactsRouter.use(authenticate);

contactsRouter.get("/", contactsController.getAll);

contactsRouter.get("/:contactId", isValidId, contactsController.getById);

contactsRouter.post(
  "/",
  upload.single("avatarContactURL"),
  isEmptyBody,
  validateBody(contactAddSchema),
  contactsController.add
);

contactsRouter.delete("/:contactId", isValidId, contactsController.deleteById);

contactsRouter.put(
  "/:contactId",
  isValidId,
  isEmptyBody,
  validateBody(contactUpdateSchema),
  contactsController.updateById
);

contactsRouter.patch(
  "/:contactId/favorite",
  isValidId,
  isEmptyBodyForFavorites,
  validateBody(contactUpdateSchema),
  contactsController.updateContactFavorite
);

contactsRouter.patch(
  "/:contactId/contactAvatars",
  upload.single("avatarContactURL"),
  validateBody(contactAvatarSchema),
  contactsController.updateContactAvatar
);

export default contactsRouter;
