import express from "express";

import contactsControllers from "../../controllers/contacts-controllers.js";

import { validateBody } from "../../decorators/index.js";

import contactsSchemas from "../../Schemas/contacts-schemas.js";

const router = express.Router();

router.get("/", contactsControllers.getAll);

router.get("/:contactId", contactsControllers.getById);

router.post(
  "/",
  validateBody(contactsSchemas.contactAddSchema),
  contactsControllers.add
);

router.put(
  "/:contactId",
  validateBody(contactsSchemas.contactAddSchema),
  contactsControllers.deleteById
);

router.delete("/:contactId", contactsControllers.getById);

export default router;
