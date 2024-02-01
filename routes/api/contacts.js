import express from "express";

import { showContacts } from "../../controllers/contacts/showContacts.js";

import { showContactById } from "../../controllers/contacts/showContactById.js";

import { createContact } from "../../controllers/contacts/createContact.js";

import { deleteContact } from "../../controllers/contacts/deleteContact.js";
const router = express.Router();

router.get("/", showContacts);

router.get("/:contactId", showContactById);

router.post("/", createContact);

router.delete("/:contactId", deleteContact);

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

export { router };
