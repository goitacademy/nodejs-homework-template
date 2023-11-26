import { Router } from "express";
import {
  validateContact,
  validateFavorite,
} from "#validators/contacts/JoiSchema.js";

import * as controllers from "#controllers/contacts/controllers.js";

const router = Router();

router.get("/", controllers.getContacts);
router.get("/:contactId", controllers.getContact);
router.post("/", validateContact, controllers.addContact);
router.delete("/:contactId", controllers.removeContact);
router.put("/:contactId", validateContact, controllers.updateContact);
router.patch(
  "/:contactId/favorite",
  validateFavorite,
  controllers.updateStatusContact
);

export default router;
