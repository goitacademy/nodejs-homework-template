import express from "express";

import { validateBody } from "../../decorators/index.js";

import { isEmptyBody } from "../../middlewares/index.js";

import contactsController from "../../controllers/contacts-controller.js";

import contastsSchemas from "../../schemas/contacts-schemas.js";

const router = express.Router();

router.get("/", contactsController.getAll);

router.get("/:contactId", contactsController.getById);

router.post(
  "/",
  isEmptyBody,
  validateBody(contastsSchemas.contactsAddSchema),
  contactsController.add
);

router.put(
  "/:contactId",
  isEmptyBody,
  validateBody(contastsSchemas.contactsAddSchema),
  contactsController.updateById
);

router.delete("/:contactId", contactsController.deleteById);

export default router;
