import express from "express";
const router = express.Router();
import contactsController from "../../controllers/contacts.js";
import {authenticate, isEmptyBody, upload, isValidId, isEmptyFavorite} from "../../middlewares/index.js";
import { validateBody } from "../../decorators/index.js";
import { contactAddSchema, contactUpdateFavoriteSchema } from "../../models/Contact.js";

const contactValidate = validateBody(contactAddSchema);
const favoriteValidate = validateBody(contactUpdateFavoriteSchema);

router.use(authenticate);
router.get("/", contactsController.getAll);

router.get("/:contactId", isValidId, contactsController.getById);

router.post("/", isEmptyBody, contactValidate, contactsController.add);

router.put("/:contactId", isValidId, isEmptyBody, contactValidate, contactsController.updateById);
router.patch("/:contactId/favorite", isValidId, isEmptyFavorite, favoriteValidate, contactsController.updateStatusContact);

router.delete("/:contactId", isValidId, contactsController.deleteById);

export default router;
