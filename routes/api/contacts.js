import express from 'express'
import contactsController from "../../controllers/contacts-controller.js";
import {isEmptyBody} from "../../middlewares/index.js"
const router = express.Router()

router.get("/", contactsController.listContacts);

router.get("/:id", contactsController.getContactById);

router.post("/", isEmptyBody,contactsController.addContact);

router.delete("/:id", contactsController.removeContact);

router.put("/:id", isEmptyBody, contactsController.updateContact);

export default router 
