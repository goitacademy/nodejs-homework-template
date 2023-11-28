import express from "express";
import contactControllers from "../../controllers/contact-controler.js";
import {
  authenticate,
  isEmptyBody,
  isVallidId as isValidId,
} from "../../middlewares/index.js";

const router = express.Router(); // Викликаємо в express метод Router

router.use(authenticate);

router.get("/", contactControllers.getAllContacts);

router.get("/:contactId", isValidId, contactControllers.getContactId);

router.post("/", isEmptyBody, contactControllers.addContact);

router.patch(
  "/:contactId/favorite",
  isEmptyBody,
  isValidId,
  contactControllers.updateContactsFiled
);

router.delete("/:contactId", isValidId, contactControllers.deleteContacts);

router.put(
  "/:contactId",
  isValidId,
  isEmptyBody,
  contactControllers.updateContacts
);

export default router;
