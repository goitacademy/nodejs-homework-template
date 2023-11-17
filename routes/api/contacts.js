import express from "express";
import { isEmptyBody, isValidId } from "../../middlewares/index.js";
import contactsControllers from "../../controllers/contactsController.js";
import { validateBody } from "../../decorators/index.js";
import {
  contactAddSchema,
  contactFavoriteSchema,
  contactUpdateSchema,
} from "../../schmes/contactSchemes.js";

const { getAll, getById, add, deleteById, updateById } = contactsControllers;

const router = express.Router();

router.get("/", getAll);

router.get("/:id", isValidId, getById);

router.post("/", isEmptyBody, validateBody(contactAddSchema), add);

router.delete("/:id", isValidId, deleteById);

router.put(
  "/:id",
  isValidId,
  isEmptyBody,
  validateBody(contactUpdateSchema),
  updateById
);

router.patch(
  "/:id/favorite",
  isValidId,
  validateBody(contactFavoriteSchema),
  updateById
);

export default router;
