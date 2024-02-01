import express from "express";
const router = express.Router();

import {
  indexContacts,
  showContacts,
  deleteContacts,
  updateContacts,
  createContacts,
  updateStatusContactController,
} from "#controllers/contacts/index.js";

router.get("/", indexContacts);
router.get("/:contactId", showContacts);
router.delete("/:contactId", deleteContacts);
router.put("/:contactId", updateContacts);
router.post("/", createContacts);
router.patch("/:contactId/favorite", updateStatusContactController);

export default router;
