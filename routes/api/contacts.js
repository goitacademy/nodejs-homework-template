import * as api from "../../models/contacts.js";
import * as contactsController from "../../controllers/contactsController.js";
import express from "express";

export const router = express.Router();

router.get("/", contactsController.listContacts);

router.get("/:id", contactsController.getContactById);

router.delete("/:id", contactsController.removeContact);

router.post("/", contactsController.addContact);

router.put("/:id", contactsController.updateContact);
