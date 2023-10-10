import express from "express";
import contactsController from "../../controllers/contacts-controller.js";
import { isEmptyBody } from "../../middlewares/index.js";
import { validateBody } from "../../decorators/index.js";
import { contactAddSchema } from "../../schemas/contact-schemas.js";

const contactAddValidate = validateBody(contactAddSchema);

const router = express.Router();

router.get("/", contactsController.getAll);

router.get("/:contactId", contactsController.getById);

router.post("/", isEmptyBody, contactAddValidate, contactsController.add);

router.put(
  "/:contactId",
  isEmptyBody,
  contactAddValidate,
  contactsController.updateById
);

router.delete("/:contactId", contactsController.deleteById);

export default router;
