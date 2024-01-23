import { Router } from "express";
import "../../auth/services/auth.strategy.js";
import auth from "../../auth/middlewares/auth.js";
import { getAllContacts } from "../controllers/getAll.js";
import { getOneContact } from "../controllers/getOne.js";
import { createContact } from "../controllers/create.js";
import { deleteContact } from "../controllers/delete.js";
import { updateContact, updateStatusContact } from "../controllers/update.js";

const router = Router();

router.get("/", auth, getAllContacts);

router.get("/:contactId", auth, getOneContact);

router.post("/", auth, createContact);

router.delete("/:contactId", auth, deleteContact);

router.put("/:contactId", auth, updateContact);

router.put("/:contactId/favourite", auth, updateStatusContact);

export default router;
