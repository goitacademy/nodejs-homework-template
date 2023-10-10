import express from "express";
import contactsControllers from "../../controllers/contacts.controller.js";
import {
  isEmptyBody,
  contactSchemaFavorite,
  contactValidateValues,
  isValidId,
} from "../../middlewares/index.js";

const contactsRouter = express.Router();

contactsRouter.get("/", contactsControllers.getAll);

contactsRouter.get("/:id", isValidId, contactsControllers.getById);

contactsRouter.post(
  "/",
  isEmptyBody,
  contactValidateValues,
  contactsControllers.add
);

contactsRouter.delete("/:id", isValidId, contactsControllers.deleteById);

contactsRouter.put(
  "/:id",
  isValidId,
  isEmptyBody,
  contactValidateValues,
  contactsControllers.updateById
);
contactsRouter.patch(
  "/:contactId/favorite",
  isValidId,
  isEmptyBody,
  contactSchemaFavorite,
  contactsControllers.updateStatusContact
);

export default contactsRouter;
