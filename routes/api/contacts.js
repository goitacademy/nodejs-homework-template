import express from "express";

import contactsRequests from "../../controllers/contacts-controller.js";

const router = express.Router();

router.get("/", contactsRequests.getAllContacts);

router.get("/:contactId", contactsRequests.getContactsById);

router.post("/", contactsRequests.addNewContact);

router.delete("/:contactId", contactsRequests.deleteContact);

router.put("/:contactId", contactsRequests.editContact);

export default router;