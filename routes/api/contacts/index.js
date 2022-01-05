import express from "express";
import { ContactsControllers } from "../../../controllers";

import {
  validateCreate,
  validateUpdate,
  validateId,
  validateUpdateFavorite,
  validateQuery,
} from "../../../midllewares/validation/validationContacts";

import guard from "../../../midllewares/guard";

const contactsControllers = new ContactsControllers();

const router = express.Router();

router.get(
  "/",
  [guard, validateQuery],
  contactsControllers.listContactsController
);

router.get(
  "/:id",
  [guard, validateId],
  contactsControllers.getContactByIdController
);

router.post(
  "/",
  [guard, validateCreate],
  contactsControllers.addContactController
);

router.delete(
  "/:id",
  [guard, validateId],
  contactsControllers.removeContactController
);

router.put(
  "/:id",
  [guard, validateId],
  validateUpdate,
  contactsControllers.updateContactController
);

router.patch(
  "/:id/favorite/",
  [guard, validateUpdateFavorite],
  contactsControllers.updateStatusContactController
);

export default router;
