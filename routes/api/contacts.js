import express from 'express'
import contactsController from "../../controllers/contacts-controller.js";
import { isEmptyBody,isValidId } from "../../middlewares/index.js"

const router = express.Router()

router.get("/", contactsController.listContacts);

router.get("/:id", isValidId, contactsController.getContactById);

router.post("/", isEmptyBody,contactsController.addContact);

router.delete("/:id",isValidId, contactsController.removeContact);

router.put("/:id", isEmptyBody,isValidId, contactsController.updateContact);
router.patch(
  "/:id/favorite",
  isValidId,
  isEmptyBody,
  contactsController.updateFavorite
);

export default router 
