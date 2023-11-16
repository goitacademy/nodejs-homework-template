import express from "express";
import contactController from "../../controllers/contacts-controller.js";
import { isEmptyBody, isValidid } from "../../middlewares/index.js";
import { validateBody } from "../../decorators/index.js";
import {
  contactAddSchema,
  contactUpdateSchema,
  contactFavoriteSchema,
} from "../../models/Contact.js";
const router = express.Router();

router.get("/", contactController.getAll);

router.get("/:contactId", isValidid, contactController.getById);

router.post(
  "/",
  isEmptyBody,
  validateBody(contactAddSchema),
  contactController.add
);

router.delete("/:contactId", isValidid, contactController.deleteById);

router.put(
  "/:contactId",
  isValidid,
  isEmptyBody,
  validateBody(contactUpdateSchema),
  contactController.updateById
);

router.patch(
  "/:contactId/favorite",
  isValidid,
  isEmptyBody,
  validateBody(contactFavoriteSchema),
  contactController.updateById
);
export default router;
