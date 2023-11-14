import express from "express";
import contactControllers from "../../controllers/contact-controler.js";
import { isEmptyBody } from "../../middlewares/index.js";

const router = express.Router(); // Викликаємо в express метод Router

router.get("/", contactControllers.getAllContacts);

router.get("/:contactId", contactControllers.getContactId);

router.post("/", isEmptyBody, contactControllers.addContact);

router.delete("/:contactId", contactControllers.deleteContacts);

router.put("/:contactId", isEmptyBody, contactControllers.updateContacts);

export default router;
