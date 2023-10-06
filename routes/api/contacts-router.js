import express from "express";
import contactsCtrl from "../../controllers/contacts-controller.js";
import { addSchema, updateFavoriteSchema, updateSchema } from "../../models/index.js";
import { validateBody } from "../../decorators/index.js";
import { isValidId, authenticate } from "../../middlewares/index.js";

const router = express.Router();

router.get("/", authenticate, contactsCtrl.getAll);

router.get("/:contactId", authenticate, isValidId, contactsCtrl.getById);

router.post("/", authenticate, validateBody(addSchema), contactsCtrl.add);

router.put(
  "/:contactId",
  authenticate,
  validateBody(updateSchema),
  isValidId,
  contactsCtrl.updateById
);

router.delete("/:contactId", authenticate, isValidId, contactsCtrl.deleteById);

router.patch(
  "/:contactId/favorite",
  authenticate,
  validateBody(updateFavoriteSchema),
  isValidId,
  contactsCtrl.updateById
);

export default router;
