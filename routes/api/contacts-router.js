import express from "express";
import contactsControllers from "../../controllers/contactsControllers.js";

const router = express.Router();

router.get("/", contactsControllers.getAllContacts);

router.get("/:contactId", contactsControllers.getContactById);

router.post("/", contactsControllers.addNewContact);
  
router.delete("/:contactId", contactsControllers.deleteContact);
  
router.put(
    "/:contactId",
    contactsControllers.updateContact
  );

export default router;