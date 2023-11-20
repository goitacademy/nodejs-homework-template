import express from "express";
import contactControllers from "../../controllers/contact-controler.js";
import { isEmptyBody, isVallidId } from "../../middlewares/index.js";

const router = express.Router(); // Викликаємо в express метод Router

router.get("/", contactControllers.getAllContacts);

router.get("/:contactId", isVallidId, contactControllers.getContactId);

router.post("/", isEmptyBody, contactControllers.addContact);

router.delete("/:contactId", isVallidId, contactControllers.deleteContacts);

router.put(
  "/:contactId",
  isVallidId,
  isEmptyBody,
  contactControllers.updateContacts
);

export default router;
