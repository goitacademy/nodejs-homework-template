import { Router } from "express";
import {getContacts,getById, removeContact, addContact, updateContact, updateStatusByID} from '../../controllers/contacts.js';
import { schema, validateData } from "../../middleware/validator.js";

const router = Router();

router.get("/", getContacts);

router.get("/:contactId", getById);

router.post("/", validateData(schema), addContact);

router.delete("/:contactId", removeContact);

router.put("/:contactId", validateData(schema), updateContact);

router.patch("/:contactId/favorite", updateStatusByID)

export default router;
