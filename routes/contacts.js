import { Router } from "express";
import { deleteContact } from "../controllers/contacts/deleteController";
import { getContactList } from "../controllers/contacts/getController";
import { postContact } from "../controllers/contacts/postController";
import { putContact } from "../controllers/contacts/putController";
import { getContactById } from "../controllers/contacts/getByIdController";
import {
  validateCreate,
  validateUpdate,
  validateId,
} from "../middlewares/validation/contactValidation";

const router = new Router();

router.get("/", getContactList);
router.get("/:id", getContactById);
router.post("/", validateCreate, postContact);
router.delete("/:id", validateId, deleteContact);
router.put("/:id", validateId, validateUpdate, putContact);

export default router;
