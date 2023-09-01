import express from "express";
import {contactsController} from "../../controllers/index.js";
import { validateData, checkBody } from "../../helpers/index.js";
import authenticate from "../../middlewares/authenticate.js";

const router = express.Router();


router.get("/", authenticate, contactsController.getContacts);
router.get("/:contactId", authenticate, contactsController.getContact);
router.post("/", validateData, authenticate, contactsController.addContact);
router.delete("/:contactId", authenticate, contactsController.deleteContact);
router.put(
  "/:contactId",
  authenticate,
    checkBody,
    validateData,
    contactsController.updateContact
);
router.patch(
  "/:contactId/favorite",
  authenticate,
  contactsController.updateStatusContact
);


export default router;
