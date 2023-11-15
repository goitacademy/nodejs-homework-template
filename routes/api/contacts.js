import express from "express";
import contactController from "../../controllers/contact-controller.js";
import isEmptyBody from "../../middelwares/isEmptyBody.js";
import validateBody from "../../decorators/validaterBody.js";
import { contactAddSchema, contactUpdateSchema } from "../../schemas/index.js";

const router = express.Router();

router.get("/", contactController.getAllContacts);

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
  validateBody(contactUpdateSchema),
  contactController.updateById
);

export default router;
