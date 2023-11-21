import express from "express";
import contactsController from "../../controllers/contactsController.js";
import { isValidId } from "../../middlewares/isValidid.js";
import { contactCheck, favoriteValid } from "../../models/Contact.js";
import validate from "../../decorators/validate.js";

const contactsValidate = validate(contactCheck);
const favoriteValidate = validate(favoriteValid);
const router = express.Router();

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
