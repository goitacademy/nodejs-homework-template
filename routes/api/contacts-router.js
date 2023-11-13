import express from "express";

import contactsController from "../../controllers/contacts-controllers.js";
import { isEmptyBody } from "../../middleware/index.js";
import { validateBody } from "../../decorators/index.js";
import { contactAddSchema, contactUpdateSchema } from "../../schemas/contacts-schemas.js";

const router = express.Router();

router.get("/", contactsController.getAllContacts);

router.get("/:id", contactsController.getContactById);

router.post("/", isEmptyBody, validateBody(contactAddSchema), contactsController.addContact);

router.delete("/:id", contactsController.deleteContactById);

router.put(
  "/:id",
  isEmptyBody,
  validateBody(contactUpdateSchema),
  contactsController.updateContactById
);

export default router;
