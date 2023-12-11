import express from "express";
import contactsController from "../../controllers/contacts-controller.js";
import isEmptyBody from "../../middlewares/isEmptyBody.js";
import validateBody from "../../decorators/validateBody.js";
import {
  contactsAddSchema,
  contactsUpdateSchema,
} from "../../models/Contact.js";
import isValidId from "../../middlewares/isValidId.js";

export const router = express.Router();

router.get("/", contactsController.getAll);

router.get("/:contactId", isValidId, contactsController.getById);

router.post(
  "/",
  isEmptyBody,
  isValidId,
  validateBody(contactsAddSchema),
  contactsController.add
);

// router.delete("/:contactId", isValidId, contactsController.removeById);

router.put(
  "/:contactId",
  isEmptyBody,
  isValidId,
  validateBody(contactsUpdateSchema),
  contactsController.updateById
);

// contactsRouter.patch(
//   "/:contactId/favorites",
//   isValidID,
//   isEmptyBody,
//   validateBody(updateFavoriteSchema),
//   ctrl.addToFavorites
// );
