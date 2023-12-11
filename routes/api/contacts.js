import express from "express";
import contactsController from "../../controllers/contacts-controller.js";
import isEmptyBody from "../../middlewares/isEmptyBody.js";
import validateBody from "../../decorators/validateBody.js";
import { contactsAddSchema, contactsUpdateSchema } from "../../schemas/contacts-schemas.js";

export const router = express.Router();

router.get("/", contactsController.getAll);

// router.get("/:contactId", contactsController.getById);

router.post(
  "/",
  isEmptyBody,
  validateBody(contactsAddSchema),
  contactsController.add
);

// router.delete("/:contactId", contactsController.removeById);

// router.put(
//   "/:contactId",
//   isEmptyBody,
//   validateBody(contactsUpdateSchema),
//   contactsController.updateById
// );
