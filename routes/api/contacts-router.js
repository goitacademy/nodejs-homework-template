import express from "express";
import contactsControllers from "../../controllers/contacts-controllers.js";
import { validateBody } from "../../decorators/index.js";
import contactSchemas from "../../schemas/contacts-schema.js";
import {
  authenticate,
  isValidId,
  isBodyEmpty,
} from "../../middlewares/index.js";

const contactsRouter = express.Router();

contactsRouter.use(authenticate);

contactsRouter.get("/", contactsControllers.getAll);

contactsRouter.get("/:id", isValidId, contactsControllers.getById);

contactsRouter.post(
  "/",
  validateBody(contactSchemas.contactSchema),
  contactsControllers.add
);

contactsRouter.delete("/:id", isValidId, contactsControllers.deleteById);

contactsRouter.put(
  "/:id",
  isValidId,
  validateBody(contactSchemas.contactSchema),
  contactsControllers.updateById
);

contactsRouter.patch(
  "/:id/favorite",
  isValidId,
  isBodyEmpty,
  validateBody(contactSchemas.contactUpdateFavorite),
  contactsControllers.updateStatusContact
);

export default contactsRouter;
