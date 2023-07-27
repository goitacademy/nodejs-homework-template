import express from "express";

import { isValidId, authenticate } from "../../middlewares/index.js";

import contactsControllers from "../../controllers/contacts-controllers.js";

import { validateBody } from "../../decorators/index.js";

import contactsSchemas from "../../Schemas/contacts-schemas.js";

const router = express.Router();

router.use(authenticate);

router.get("/", contactsControllers.getAll);

router.get("/:contactId", isValidId, contactsControllers.getById);

router.post(
  "/",
  validateBody(contactsSchemas.contactAddSchema),
  contactsControllers.add
);

router.put(
  "/:contactId",
  validateBody(contactsSchemas.contactAddSchema),
  contactsControllers.updateById
);
router.patch(
  "/:contactId/favorite",
  validateBody(contactsSchemas.contactUpdateFavoriteSchema),
  contactsControllers.updateFavorite
);
router.delete("/:contactId", isValidId, contactsControllers.deleteById);

export default router;
