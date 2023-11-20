import contactService from "../../models/contacts.js";
import contactController from "../../controllers/contact-controller.js";
import express from "express";
import { isEmptyBody } from "../../middlewares/index.js";
const router = express.Router();

router.get("/", contactController.getAllContacts);

router.get("/:contactId", contactController.getByID);

router.post("/", isEmptyBody, contactController.addNewContact);

router.delete("/:contactId", contactController.deleteById);

router.put("/:contactId", isEmptyBody, contactController.updateById);

export default router;
