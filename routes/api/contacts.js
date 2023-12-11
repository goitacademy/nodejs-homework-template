import express from "express";
import contactsController from "../../controllers/contacts-controller.js";
import {
  isEmptyBody,
  isValidId,
  isEmptyFavorite,
  authenticate,
  upload,
} from "../../middlewares/index.js";
import validateBody from "../../decorators/validaterBody.js";
import {
  contactAddSchema,
  contactFavoriteSchema,
  contactUpdateSchema,
} from "../../models/contacts/contacts.js";
const router = express.Router();
router.use(authenticate);
router.get("/", contactsController.listContacts);

router.get("/:id", isValidId, contactsController.getContactById);

router.post(
  "/",
  upload.single("avatar"),
  isEmptyBody,
  validateBody(contactAddSchema),
  contactsController.addContact
);

router.delete("/:id", isValidId, contactsController.removeContact);

router.put(
  "/:id",
  isEmptyBody,
  isValidId,
  validateBody(contactUpdateSchema),
  contactsController.updateContact
);
router.patch(
  "/:id/favorite",
  isValidId,
  isEmptyFavorite,
  validateBody(contactFavoriteSchema),
  contactsController.updateFavorite
);

export default router;
