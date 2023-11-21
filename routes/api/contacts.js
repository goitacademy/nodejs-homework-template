import express from "express";
import contactsController from "../../controllers/contacts-controller.js";
import isEmptyBody from "../../middlewars/isEmptyBody.js";
import validateBody from "../../decorators/bodyValidator.js";
import {
  addContactSchema,
  updateContactSchema,
} from "../../schemas/contacts-schemas.js";

const router = express.Router();

router.get("/", contactsController.getAll);

// router.get("/:contactId", contactsController.getByID);

// router.post(
//   "/",
//   isEmptyBody,
//   validateBody(addContactSchema),
//   contactsController.add
// );

// router.delete("/:contactId", contactsController.deleteByID);

// router.put(
//   "/:contactId",
//   isEmptyBody,
//   validateBody(updateContactSchema),
//   contactsController.update
// );

export default router;
