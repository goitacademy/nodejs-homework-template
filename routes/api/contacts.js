import express from "express";
import {
  listContactsController,
  getContactByIdController,
  addContactController,
  removeContactController,
  updateContactController,
  updateStatusContactController,
} from "../../controllers";
import {
  validateCreate,
  validateUpdate,
  validateId,
  validateUpdateFavorite,
  validateQuery,
} from "../../midllewares/validation/validationContacts";

const router = express.Router();

router.get("/", validateQuery, listContactsController);

router.get("/:id", validateId, getContactByIdController);

router.post("/", validateCreate, addContactController);

router.delete("/:id", validateId, removeContactController);

router.put("/:id", validateId, validateUpdate, updateContactController);

router.patch(
  "/:id/favorite/",
  validateUpdateFavorite,
  updateStatusContactController
);

export default router;
