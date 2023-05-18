import { Router } from "express";
import contactsControllers from "../../controllers/contacts-controllers.js";
import schema from "../../schemas/contacts-schemas.js";
import validateBody from "../../decorators/validateBody.js";

const router = Router();

router.get("/", contactsControllers.listContacts);
router.get("/:id", contactsControllers.getContactById);
router.post(
  "/",
  validateBody(schema.contactAddSchema),
  contactsControllers.addContact
);
router.delete("/:id", contactsControllers.removeContact);
router.put(
  "/:id",
  validateBody(schema.contactAddSchema),
  contactsControllers.updateContact
);

export default router;
