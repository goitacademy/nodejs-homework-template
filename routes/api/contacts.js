import express from "express";
import { contactsController } from "../../controllers/index.js";
const router = express.Router();

router.get("/", contactsController.getAll);

router.get("/:contactId", contactsController.getByid);

router.post("/", contactsController.addContact);

router.delete("/:contactId", contactsController.deleteContact);

router.put("/:contactId", contactsController.updateContact);

export default router;
