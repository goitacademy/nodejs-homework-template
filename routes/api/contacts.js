import express from "express";
import authMiddleware from "../../middlewares/jwt.js";

import { indexContacts } from "../../controllers/contacts/indexContacts.js";
import { showContacts } from "../../controllers/contacts/showContacts.js";
import { deleteContacts } from "../../controllers/contacts/deleteContacts.js";
import { updateContacts } from "../../controllers/contacts/updateContacts.js";
import { createContacts } from "../../controllers/contacts/createContacts.js";
import { changeContacts } from "../../controllers/contacts/changeContacts.js";

const router = express.Router();

router.get("/", indexContacts);

router.get("/:contactId", showContacts);

router.post("/", authMiddleware, createContacts);

router.delete("/:contactId", authMiddleware, deleteContacts);

router.put("/:contactId", authMiddleware, updateContacts);

router.patch("/:contactId/favorite", authMiddleware, changeContacts);

export { router };
