import express from "express";
import contactController from "../../controllers/contact-controller.js";
import { validateBody } from "../../decorators/index.js";
import {
  isEmptyBody,
  isValidId,
  isEmptyBodyFavorite,
  authenticate
} from "../../middleware/index.js";
import {
  contactAddSchema,
  contactUpdateSchema,
  contactUpdateFavoritesSchema,
} from "../../models/contacts.js";

const router = express.Router();

router.use(authenticate);

router.get("/", contactController.getAll);

router.get("/:id", isValidId, contactController.getById);

router.post(
  "/",
  isEmptyBody,
  validateBody(contactAddSchema),
  contactController.add
);

router.put(
  "/:id",
  isValidId,
  isEmptyBody,
  validateBody(contactUpdateSchema),
  contactController.updateById
);

router.patch(
  "/:id/favorite",
  isValidId,
  isEmptyBodyFavorite,
  validateBody(contactUpdateFavoritesSchema),
  contactController.updateFavoriteById
);

router.delete("/:id", isValidId, contactController.deleteById);

export default router;
