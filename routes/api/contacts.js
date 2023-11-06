import express from "express";

import contactsController from "../../controllers/controllers.js";

import {
  authenticate,
  isEmptyBody,
  isValidId,
  upload,
} from "../../middlewares/index.js";

import { validateBody } from "../../decorators/index.js";

import {
  contactsAddSchema,
  contactUpdateFavoriteSchema,
} from "../../models/Contact.js";

const contactsAddValidate = validateBody(contactsAddSchema);
const contactsUpdateFavoriteValidate = validateBody(
  contactUpdateFavoriteSchema
);

const contactsRouter = express.Router();

contactsRouter.use(authenticate);

contactsRouter.get("/", contactsController.getAll);

contactsRouter.get("/:contactId", isValidId, contactsController.getById);

contactsRouter.post(
  "/",
  upload.single("avatarURL"),
  isEmptyBody,
  contactsAddValidate,
  contactsController.post
);

contactsRouter.delete("/:contactId", isValidId, contactsController.remove);

contactsRouter.put(
  "/:contactId",
  isValidId,
  isEmptyBody,
  contactsAddValidate,
  contactsController.updateById
);

contactsRouter.patch(
  "/:contactId/favorite",
  isValidId,
  isEmptyBody,
  contactsUpdateFavoriteValidate,
  contactsController.updateFavorite
);

export default contactsRouter;
