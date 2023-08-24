import express from "express";
import contactsController from "../../controllers/index.js";
import { validateData, checkBody } from "../../helpers/index.js";

const router = express.Router();


router.get("/", contactsController.getContacts);
router.get("/:contactId", contactsController.getContact);
router.post("/", validateData, contactsController.addContact);
router.delete("/:contactId", contactsController.deleteContact);
router.put(
    "/:contactId",
    checkBody,
    validateData,
    contactsController.updateContact
);
router.patch(
  "/:contactId/favorite",
  contactsController.updateStatusContact
);


export default router;
