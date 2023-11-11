import express from "express";
import contactsController from "../../controllers/contacts-controller.js";
import isEmptyBode from "../../middlewares/isEmptyBody.js";

const router = express.Router();

router.get("/", contactsController.getAllContacts);

router.get("/:contactId", contactsController.getContactById);

router.post("/", isEmptyBode, contactsController.addContact);

router.delete("/:contactId", contactsController.deleteContact);

router.put("/:contactId", isEmptyBode, contactsController.updateContact);

export default router;
