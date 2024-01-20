import { Router } from "express";
import { getAllContacts } from "../controllers/getAll.js";
import { getOneContact } from "../controllers/getOne.js";
import { createContact } from "../controllers/create.js";
import { deleteContact } from "../controllers/delete.js";
import { updateContact } from "../controllers/update.js";

const router = Router();

router.get("/", getAllContacts);

router.get("/:contactId", getOneContact);

router.post("/", createContact);

router.delete("/:contactId", deleteContact);

router.put("/:contactId", updateContact);

export default router;
