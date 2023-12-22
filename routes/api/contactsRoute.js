import express from "express";
import contactsController from "../../controllers/contacts-controller.js";
import isEmptyBody from "../../middlewares/isEmptyBody.js";
import { isValidId } from "../../middlewares/isValidId.js";
import validateBody from "../../decorators/validateBody.js";
import { contactUpdateFavoriteSchema } from "../../models/Contact.js";

const contactsRouter = express.Router();

contactsRouter.get("/", contactsController.getAll);
contactsRouter.get("/:id", isValidId, contactsController.getByID);
contactsRouter.post("/", isEmptyBody, contactsController.add);
contactsRouter.put(
  "/:id",
  isEmptyBody,
  isValidId,
  contactsController.updateById
);
contactsRouter.delete("/:id", isValidId, contactsController.deleteById);
contactsRouter.patch(
  "/:id/favorite",
  isValidId,
  isEmptyBody,
  validateBody(contactUpdateFavoriteSchema),
  contactsController.updateById
);

export default contactsRouter;
