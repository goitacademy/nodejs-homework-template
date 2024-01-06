import express from "express";
const router = express.Router();

import {
  getContacts,
  showContact,
  createContact,
  deleteContact,
  putContact,
} from "../../controllers/contacts/index.js";

import { validation } from "../../validation/validation.js";

router.get("/", getContacts);

router.get("/:contactId", showContact);

router.post("/", validation, createContact);

router.delete("/:contactId", deleteContact);

router.put("/:contactId", validation, putContact);

export { router as contactsRouter };
