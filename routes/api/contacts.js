import express from "express";

import { contactsController } from "../../controllers/index.js";
import { isValidId, authenticate } from "../../middlewares/index.js";

import { contactCheck, favoriteValid } from "../../models/contacts.js";
import { validate } from "../../decorators/index.js";

const contactsValidate = validate(contactCheck);
const favoriteValidate = validate(favoriteValid);
const router = express.Router();

router.use(authenticate);

router.get("/", contactsController.getList);

router.get("/:id", isValidId, contactsController.getContactId);

router.post("/", contactsValidate, contactsController.postAddContact);

router.delete("/:id", isValidId, contactsController.deleteContact);

router.put(
  "/:id",
  isValidId,
  contactsValidate,
  contactsController.updateContact
);

router.patch(
  "/:id/favorite",
  isValidId,
  favoriteValidate,
  contactsController.updateContact
);

export default router;
