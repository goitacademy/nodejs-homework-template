import express from "express";
import contactController from "../../controllers/contacts-controller.js";
import { validateBody } from "../../decorators/index.js";
import { isEmptyBody, authenticate } from "../../middlewares/index.js";
import {
  contactAddSchema,
  contactFavoriteSchema,
} from "../../models/Contact.js";

const isValidate = validateBody(contactAddSchema);

const isFavoriteValidate = validateBody(contactFavoriteSchema);

const contactsRouter = express.Router();

contactsRouter.use(authenticate);

contactsRouter.get("/", contactController.getAll);

contactsRouter.get("/:contactId", contactController.getById);

contactsRouter.post("/", isEmptyBody, isValidate, contactController.add);

contactsRouter.delete("/:contactId", isEmptyBody, contactController.deleteById);

contactsRouter.put(
  "/:contactId",
  isEmptyBody,
  isValidate,
  contactController.updateById
);

contactsRouter.patch(
  "/:contactId/favorite",
  isEmptyBody,
  isFavoriteValidate,
  contactController.updateById
);

export default contactsRouter;
