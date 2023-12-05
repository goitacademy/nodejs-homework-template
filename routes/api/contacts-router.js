import { Router } from "express";
import contactsController from "../../controllers/contacts-controller.js";
import { isValidId } from "../../middlewares/isValidId.js";
import authenticate from "../../middlewares/authenticate.js";
import { userVerify } from "../../middlewares/userVerify.js";
import { bodyValidator } from "../../decorators/bodyValidatorWrapper.js";
import contactsSchemas from "../../schemas/contacts-schemas.js";

const contactsRouter = Router();

contactsRouter.use(authenticate);

// Get all contacts
contactsRouter.get("/", contactsController.getAll);

// Get contact by ID
contactsRouter.get("/:contactId", isValidId, contactsController.getById);

// ➕ Add new Contact
contactsRouter.post(
  "/",
  bodyValidator(contactsSchemas.contactSchemaJoi),
  contactsController.add
);

// Update contact's information
contactsRouter.put(
  "/:contactId",
  userVerify,
  bodyValidator(contactsSchemas.contactSchemaJoi),
  isValidId,
  contactsController.updateById
);

// Update contact Status by ID
contactsRouter.patch(
  "/:contactId/favorite",
  userVerify,
  bodyValidator(contactsSchemas.updateFavoriteSchema),
  isValidId,
  contactsController.updateFavorite
);

// Delete Contact
contactsRouter.delete(
  "/:contactId",
  userVerify,
  contactsController.removeContactById
);

export default contactsRouter;
