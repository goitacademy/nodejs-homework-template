import express from "express";
import contactsController from "../../controllers/contact-controller.js";
import { isEmptyBody, isValidId } from "../../middlewars/index.js";
import { validateBody } from "../../decorators/index.js";
import contactsSchema from "../../schemas/contacts-schemas.js";

const contactsRouter = express.Router();

contactsRouter.get("/", contactsController.getAll);

contactsRouter.get("/:id", isValidId, contactsController.getById);

contactsRouter.post(
  "/",
  isEmptyBody,
  validateBody(contactsSchema.contactsAddSchema),
  contactsController.add
);

contactsRouter.put(
  "/:id",
  isValidId,
  isEmptyBody,
  validateBody(contactsSchema.contactsAddSchema),
  contactsController.updateById
);

contactsRouter.patch(
  "/:id/favorite",
  isValidId,
  isEmptyBody,
  validateBody(contactsSchema.contactUpdateFavoriteSchema),
  contactsController.updateFavorite
);

contactsRouter.delete("/:id", isValidId, contactsController.deleteById);

export default contactsRouter;
