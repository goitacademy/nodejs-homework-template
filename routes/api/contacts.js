import express from "express";
import contactController from "../../controllers/contact-controller.js";
import { isEmptyBody, isValidId } from "../../middelwares/index.js";
import validateBody from "../../decorators/validaterBody.js";
import {
  contactAddSchema,
  contactUpdateSchema,
  contactFaviriteSchema,
} from "../../schemas/index.js";

const router = express.Router();

router.get("/", contactController.getAllContacts);

router.get("/:contactId", isValidId, contactController.getById);

router.post(
  "/",
  isEmptyBody,
  validateBody(contactAddSchema),
  contactController.add
);

router.put(
  "/:contactId",
  isValidId,
  isEmptyBody,
  validateBody(contactUpdateSchema),
  contactController.updateById
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  isEmptyBody,
  validateBody(contactFaviriteSchema),
  contactController.updateById
);

router.delete("/:contactId", isValidId, contactController.deleteById);

export default router;
