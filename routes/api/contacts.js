import express from "express";
import { contactsController } from "../../controllers/index.js";
import { isEmptyBody } from "../../middleware/index.js";
const router = express.Router();

router.get("/", contactsController.getAll);

router.get("/:contactId", contactsController.getByid);

router.post("/", isEmptyBody, contactsController.addContact);

router.delete("/:contactId", contactsController.deleteContact);

router.put("/:contactId", isEmptyBody, contactsController.updateContact);

export default router;
