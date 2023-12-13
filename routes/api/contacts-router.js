import express from "express";
import contactsController from "../../controllers/contacts-controller.js";
import { isEmptyBody } from "../../middlewares/index.js";

import { validateBody } from "../../decorators/index.js";

import {
  contactAddSchema,
  contactUpdateSchema,
} from "../../schemas/contacts-schemas.js";

const contactsRouter = express.Router();

contactsRouter.get("/", contactsController.getAll);

// contactsRouter.get("/:contactId", contactsController.getById);

// contactsRouter.post(
//   "/",
//   isEmptyBody,
//   validateBody(contactAddSchema),
//   contactsController.add
// );

// contactsRouter.delete("/:contactId", contactsController.deleteById);

// contactsRouter.put(
//   "/:contactId",
//   isEmptyBody,
//   validateBody(contactUpdateSchema),
//   contactsController.updateById
// );

export default contactsRouter;
