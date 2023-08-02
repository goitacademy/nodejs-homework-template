import express from "express";

import ctrl from "../../controllers/contacts-controller.js";

import { validateBody } from "../../decorators/index.js";
import {
  authenticate,
  isBodyEmpty,
  isBodyFavoriteEmpty,
  isValidId,
} from "../../middlewares/index.js";

import contactsSchemas from "../../schemas/contacts-schemas.js";

const contactsRouter = express.Router();

contactsRouter.use(authenticate);

contactsRouter.get("/", ctrl.getAll);

contactsRouter.get("/:contactId", isValidId, ctrl.getById);

contactsRouter.post(
  "/",
  isBodyEmpty,
  validateBody(contactsSchemas.addSchema),
  ctrl.add
);

contactsRouter.put(
  "/:contactId",
  isBodyEmpty,
  isValidId,
  validateBody(contactsSchemas.addSchema),
  ctrl.updateByid
);
contactsRouter.patch(
  "/:contactId/favorite",
  isBodyFavoriteEmpty,
  isValidId,
  validateBody(contactsSchemas.contactUpdateFavorites),
  ctrl.updateStatusContact
);

contactsRouter.delete("/:contactId", isValidId, ctrl.deleteById);

export default contactsRouter;
