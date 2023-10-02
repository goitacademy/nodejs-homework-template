import express from "express";

import contactController from "../../controllers/contactsController.js";
import { emptyBodyCheck } from "../../middlewares/index.js";
import { validateBody } from "../../decorators/index.js";
import { contactSchema } from "../../schemas/contactValidationSchema.js";

const validateContact = validateBody(contactSchema);

const router = express.Router();

router.get("/", contactController.getAll);

router.get("/:contactId", contactController.getOne);

router.post("/", emptyBodyCheck, validateContact, contactController.add);

router.delete("/:contactId", contactController.remove);

router.put(
  "/:contactId",
  emptyBodyCheck,
  validateContact,
  contactController.update
);

export default router;
