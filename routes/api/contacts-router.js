import express from "express";
// import contactController from "../../controllers/contact-controller.js";
import * as contactController from "../../controllers/index.js";

import { isEmptyBody, isValidId } from "../../middelwares/index.js";
import validateBody from "../../decorators/validaterBody.js";
import {
  contactAddSchema,
  contactUpdateSchema,
  contactFaviriteSchema,
} from "../../schemas/index.js";

const contactsRouter = express.Router();

contactsRouter.get("/", contactController.getAllContacts);

contactsRouter.get("/:contactId", isValidId, contactController.getById);

contactsRouter.post(
  "/",
  isEmptyBody,
  validateBody(contactAddSchema),
  contactController.addContact
);

contactsRouter.put(
  "/:contactId",
  isValidId,
  isEmptyBody,
  validateBody(contactUpdateSchema),
  contactController.updateById
);

contactsRouter.patch(
  "/:contactId/favorite",
  isValidId,
  isEmptyBody,
  validateBody(contactFaviriteSchema),
  contactController.updateById
);

contactsRouter.delete("/:contactId", isValidId, contactController.deleteById);

export default contactsRouter;
