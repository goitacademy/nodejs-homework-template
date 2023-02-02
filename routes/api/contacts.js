import express from "express";
import { add } from "../../controllers/contacts/add.js";
import { deleteById } from "../../controllers/contacts/deleteById.js";
import { getAll } from "../../controllers/contacts/getAll.js";
import { getById } from "../../controllers/contacts/getById.js";
import { updateById } from "../../controllers/contacts/updateById.js";
import { ctrlWrapper } from "../../helpers/ctrlWrapper.js";
import { validationBody } from "../../middlewares/validationBody.js";
import { addContactSchema } from "../../schemas/contacts.js";

export const contactsRouter = express.Router();

contactsRouter.get("/", ctrlWrapper(getAll));

contactsRouter.get("/:contactId", ctrlWrapper(getById));

contactsRouter.post("/", validationBody(addContactSchema), ctrlWrapper(add));

contactsRouter.delete("/:contactId", ctrlWrapper(deleteById));

contactsRouter.put(
  "/:contactId",
  validationBody(addContactSchema),
  ctrlWrapper(updateById)
);
