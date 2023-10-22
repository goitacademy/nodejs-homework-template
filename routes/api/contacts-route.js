import express from "express";
import contactController from "../../controllers/contacts-controller.js";
import { validateBody } from "../../decorators/index.js";
import {
  contactAddSchema,
  contactFavoriteSchema,
} from "../../models/Contact.js";

const isValidate = validateBody(contactAddSchema);

const isFavoriteValidate = validateBody(contactFavoriteSchema);

const contactsRouter = express.Router();

contactsRouter.get("/", contactController.getAll);

contactsRouter.get("/:contactId", contactController.getById);

contactsRouter.post("/", isValidate, contactController.add);

contactsRouter.delete("/:contactId", contactController.deleteById);

contactsRouter.put("/:contactId", isValidate, contactController.updateById);

contactsRouter.patch(
  "/:contactId/favorite",
  isFavoriteValidate,
  contactController.updateById
);

export default contactsRouter;
