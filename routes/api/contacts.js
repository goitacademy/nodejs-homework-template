import express from "express";
import contactsController from "../../controllers/contacts.js";
import { isEmpty } from "../../middlewars/index.js";
import { contactSchemaValidation } from "../../decorators/index.js";
import { postSchema, putSchema } from "../../schemas/contacts-schemas.js";
const router = express.Router();

router.get("/", contactsController.listContacts);

router.get("/:id", contactsController.getById);

router.post(
  "/",
  isEmpty,
  contactSchemaValidation(postSchema),
  contactsController.addContact
);

router.delete("/:id", contactsController.removeContact);

router.put(
  "/:id",
  isEmpty,
  contactSchemaValidation(putSchema),
  contactsController.updateContact
);

export default router;
