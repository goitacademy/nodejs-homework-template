import express from "express";
import { ctrlWrapper, validateBody } from "../../decorators/index.js";
import {
  add,
  contactGetById,
  contactsGet,
  remove,
  updateById,
} from "../../controllers/contacts-controller.js";
import { isEmptyBody } from "../../middlewares/index.js";
import {
  contactAddSchema,
  contactUpdateSchema,
} from "../../schemas/contacts-schema.js";

const contactsRouter = express.Router();

contactsRouter.get("/", ctrlWrapper(contactsGet));

contactsRouter.get("/:contactId", ctrlWrapper(contactGetById));

contactsRouter.post(
  "/",
  isEmptyBody,
  validateBody(contactAddSchema),
  ctrlWrapper(add)
);

contactsRouter.delete("/:contactId", ctrlWrapper(remove));

contactsRouter.put(
  "/:contactId",
  isEmptyBody,
  validateBody(contactUpdateSchema),
  ctrlWrapper(updateById)
);

export default contactsRouter;
