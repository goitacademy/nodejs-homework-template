import express from "express";
import * as contactsSchemas from "../../schemas/index.js";
import { contactsController } from "../../controllers/index.js";
import { validateBody } from "../../decorators/index.js";
import { isValidId } from "../../middlewares/index.js";

export const router = express.Router();

router.get("/", contactsController.listContacts);

router.get("/:id", isValidId, contactsController.getContactById);

router.post(
  "/",
  validateBody(contactsSchemas.contactAddSchema),
  contactsController.addContact
);

router.put(
  "/:id",
  isValidId,
  validateBody(contactsSchemas.contactAddSchema),
  contactsController.updateContactById
);

router.patch(
  "/:id/favorite",
  isValidId,
  validateBody(contactsSchemas.contactUpdateFavoriteSchema),
  contactsController.updateContactFavoriteById
);

router.delete("/:id", isValidId, contactsController.removeContactById);
