import { Router } from "express";
import * as ctrl from "../../controller/contacts.js";
const router = Router();

router.get("/", ctrl.getContacts);

router.get("/:contactId", ctrl.getContactByID);

router.post("/", ctrl.createContact);

router.delete("/:contactId", ctrl.removeContact);

router.put("/:contactId", ctrl.updateContact);

router.patch("/:contactId/favorite", ctrl.updateContactFavoriteField);

export { router };
