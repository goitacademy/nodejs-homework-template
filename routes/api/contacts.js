import express from "express";
import contactsController from "../../controllers/contacts";
import {
  validateCreate,
  validateUpdate,
  validateId,
  validateUpdateFavorite,
  validateQuery,
} from "../../midllewares/validation/validation";

const router = express.Router();

router.get("/", validateQuery, contactsController.listContactsController);

router.get("/:id", validateId, contactsController.getContactByIdController);

router.post("/", validateCreate, contactsController.addContactController);

router.delete("/:id", validateId, contactsController.removeContactController);

router.put(
  "/:id",
  validateId,
  validateUpdate,
  contactsController.updateContactController
);

router.patch(
  "/:id/favorite/",
  validateUpdateFavorite,
  contactsController.updateStatusContactController
);

export default router;
