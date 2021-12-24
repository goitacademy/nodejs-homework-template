import express from "express";
import contactsController from "../../controllers/contacts";
import {
  validateCreate,
  validateUpdate,
  validateUpdateFavorite,
} from "../../midllewares/validation/validation";

const router = express.Router();

router.get("/", contactsController.listContactsController);

router.get("/:id", contactsController.getContactByIdController);

router.post("/", validateCreate, contactsController.addContactController);

router.delete("/:id", contactsController.removeContactController);

router.put("/:id", validateUpdate, contactsController.updateContactController);

router.patch(
  "/:id/favorite/",
  validateUpdateFavorite,
  contactsController.updateStatusContactController
);

export default router;
