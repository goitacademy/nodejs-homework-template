import express from "express";
import * as contactsControllers from "../../controllers/index.js";

const router = express.Router();
const {
  indexContacts,
  showContacts,
  createContacts,
  deleteContacts,
  updateContacts,
} = contactsControllers;

router.get("/", indexContacts);

router.get("/:contactId", showContacts);

router.post("/", createContacts);

router.delete("/:contactId", deleteContacts);

router.put("/:contactId", updateContacts);

export default router;
