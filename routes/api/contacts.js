import { contactsAddSchema } from "../../schemas/contactSchemas.js";
import validateBody from "../../decorators/validateBody.js";
import contactControllers from "../../controllers/contact.controlers.js";
import { isEmptyBody } from "../../middleware/index.js";
import express from "express";

const contactAddValidate = validateBody(contactsAddSchema);

const router = express.Router();

router.get("/", contactControllers.getAllContacts);

router.get("/:contactId", contactControllers.getById);

router.post("/", isEmptyBody, contactAddValidate, contactControllers.add);

router.delete("/:contactId", contactControllers.removeById);

router.put(
  "/:contactId",
  isEmptyBody,
  contactAddValidate,
  contactControllers.updateById
);

export default router;
