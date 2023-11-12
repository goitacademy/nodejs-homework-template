import express from "express";

import {
  getAllContacts,
  getContactById,
  addContact,
  updateContact,
  deleteContact,
} from "../../controllers/contacts-controller.js";

import { isEmptyBody } from "../../middlewares/index.js";

const contactsRouter = express.Router();

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id", getContactById);

contactsRouter.post("/", isEmptyBody, addContact);

contactsRouter.delete("/:id", deleteContact);

contactsRouter.put("/:id", isEmptyBody, updateContact);

export default contactsRouter;
