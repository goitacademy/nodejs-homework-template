import express from "express";

import ctrl from "../../controllers/contacts-controller.js";

import { validateBody } from "../../decorators/index.js";

import contactsSchemas from "../../schemas/contacts-schemas.js";

const router = express.Router();

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getById);

router.post("/", validateBody(contactsSchemas.addSchema), ctrl.add);

router.put(
  "/:contactId",
  validateBody(contactsSchemas.addSchema),
  ctrl.updateByid
);

router.delete("/:contactId", ctrl.deleteById);

export default router;
