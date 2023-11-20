import express from "express";

import contactsController from "../../controllers/contacts-controller.js";
import isEmptyBody from "../../utils/middlewares/isEmptyBody.js";
import isValidId from "../../utils/middlewares/isValidId.js";

const contactsRouter = express.Router();

contactsRouter.get("/", contactsController.getAll);

contactsRouter.get("/:contactId", isValidId, contactsController.getById);

contactsRouter.post("/", isEmptyBody, contactsController.add);

contactsRouter.put(
  "/:contactId",
  isEmptyBody,
  isValidId,
  contactsController.updateContact
);

contactsRouter.patch(
  "/:contactId/favorite",
  isValidId,
  isEmptyBody,
  contactsController.updateStatusContact
);

contactsRouter.delete("/:contactId", isValidId, contactsController.deleteById);

export default contactsRouter;
