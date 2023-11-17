import express from "express";
import { ctrlWrapper, validateBody } from "../../decorators/index.js";
import {
  contactGetById,
  contactsGet,
} from "../../controllers/contacts-controller.js";
import { isEmptyBody, isValidId } from "../../middlewares/index.js";
import {
  contactAddSchema,
  contactUpdateSchema,
} from "../../schemas/contacts-schema.js";

const contactsRouter = express.Router();

contactsRouter.get("/", ctrlWrapper(contactsGet));

contactsRouter.get("/:contactId", isValidId, ctrlWrapper(contactGetById));

// contactsRouter.post(
//   "/",
//   isEmptyBody,
//   validateBody(contactAddSchema),
//   ctrlWrapper(add)
// );

// contactsRouter.delete("/:contactId", ctrlWrapper(remove));

// contactsRouter.put(
//   "/:contactId",
//   isEmptyBody,
//   validateBody(contactUpdateSchema),
//   ctrlWrapper(updateById)
// );

export default contactsRouter;
