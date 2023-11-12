import express from "express";
import contactController from "../../controllers/contacts-controller.js";
import { isEmptyBody } from "../../middlewares/index.js";
import { validateBody } from "../../decorators/index.js";
import {
  contactAddSchema,
  contactUpdateSchema,
} from "../../shemas/contact-schemas.js";
const router = express.Router();

router.get("/", contactController.getAll);

router.get("/:contactId", contactController.getById);

router.post(
  "/",
  isEmptyBody,
  validateBody(contactAddSchema),
  contactController.add
);

router.delete("/:contactId", contactController.deleteById);

router.put(
  "/:contactId",
  isEmptyBody,
  validateBody(contactAddSchema),
  contactController.updateById
);

export default router;
