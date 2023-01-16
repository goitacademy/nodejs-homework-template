import express from "express";

import contactController from "../controller/controller.js";
import { createContact, updatingContact, updateStatusContact } from "../utilites/validation.js";
const router = express.Router()
router.get("/contacts", contactController.getAll);

router.get("/contacts/:contactId", contactController.getOne);

router.post("/contacts", createContact, contactController.post);

router.delete("/contacts/:contactId", contactController.deleteContact);

router.put(
    "/contacts/:contactId",
    updatingContact,
    contactController.put
);

router.patch(
    "/contacts/:contactId/favorite",
    updateStatusContact,
    contactController.patchFavorite
);

export default router;