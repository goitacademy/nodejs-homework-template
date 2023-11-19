import { Router } from "express";
import {
  add,
  getAll,
  getById,
  removeContactById,
  updateById,
  updateFavorite,
} from "../../controllers/api-contacts.js";
import { isValidId } from "../../middlewares/isValidId.js";
import { authenticate } from "../../middlewares/authenticate.js";
import { userVerify } from "../../middlewares/userVerify.js";

const router = Router();

router.get("/", authenticate, getAll);

// Get a contact by ID
router.get("/:contactId", authenticate, isValidId, getById);

// Add a new Contact
router.post("/", authenticate, add);

// Update a contact's information
router.put("/:contactId", authenticate, userVerify, isValidId, updateById);

// Update a contact Status by ID
router.patch(
  "/:contactId/favorite",
  authenticate,
  userVerify,
  isValidId,
  updateFavorite
);

// Delete a Contact
router.delete("/:contactId", authenticate, userVerify, removeContactById);

export default router;
