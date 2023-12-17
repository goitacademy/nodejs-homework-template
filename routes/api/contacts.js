import express from "express";
import contactsController from "../../controllers/contacts-controller.js";
import { isEmptyBody, isValidId } from "../../middlewares/index.js";
import validateBody from "../../decorators/validateBody.js";
import {
  contactAddScheme,
  contactUpdateScheme,
  contactUpdateFavoriteScheme,
} from "../../models/contact.js";

const contactsRouter = express.Router();

contactsRouter.get("/", contactsController.getAll);

contactsRouter.get("/:contactId", isValidId, contactsController.getById);

contactsRouter.post(
  "/",
  isEmptyBody(),
  validateBody(contactAddScheme),
  contactsController.add
);

contactsRouter.delete("/:contactId", isValidId, contactsController.deleteById);

contactsRouter.put(
  "/:contactId",
  isValidId,
  isEmptyBody(),
  validateBody(contactUpdateScheme),
  contactsController.updateById
);

contactsRouter.patch(
  "/:contactId/favorite",
  isEmptyBody("missing field favorite"),
  isValidId,
  validateBody(contactUpdateFavoriteScheme),
  contactsController.updateStatusContact
);

export default contactsRouter;
