import express from "express";
import { indexContacts } from "../../controllers/contacts/indexContacts.js";
import { showContacts } from "../../controllers/contacts/showContacts.js";
import { deleteContacts } from "../../controllers/contacts/deleteContacts.js";
import { createContacts } from "../../controllers/contacts/createContacts.js";
import { updateContacts } from "../../controllers/contacts/updateContacts.js";
import { updateStatusContacts } from "../../controllers/contacts/updateStatusContacts.js";

const router = express.Router();

router.get("/", indexContacts);

router.get("/:contactId", showContacts);

router.post("/", createContacts);
router.delete("/:contactId", deleteContacts);

router.put("/:contactId", updateContacts);
router.patch("/:contactId/favorite", updateStatusContacts);

export { router };
