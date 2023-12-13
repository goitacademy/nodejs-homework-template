import express from "express";
import contactsController from "../../controllers/contacts-controller.js";
import isEmptyBody from "../../middlewares/isEmptyBody.js";
import isValidId from "../../middlewares/isValidId.js";
import authenticate from "../../middlewares/authenticate.js";

const router = express.Router();

router.use(authenticate);

router.get("/", contactsController.getAllContacts);

router.get("/:contactId", isValidId, contactsController.getContactById);

router.post("/", isEmptyBody, contactsController.addContact);

router.patch(
  "/:contactId/favorite",
  isValidId,
  isEmptyBody,
  contactsController.updateStatusContact
);

router.delete("/:contactId", isValidId, contactsController.deleteContact);

router.put(
  "/:contactId",
  isValidId,
  isEmptyBody,
  contactsController.updateContact
);

export default router;