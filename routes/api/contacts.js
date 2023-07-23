import express from "express";
import {
  addContact,
  getContactById,
  listContacts,
  removeContact,
  updateContactById,
} from "../../controllers/contacts.js";
import HttpError from "../../helpters/HttpError.js";
import { contactsAddSchema } from "../../schemas/joi.js";
import isValidId from "../../middlewares/isValidId.js";

const contactsRouter = express.Router();

contactsRouter.get("/", listContacts);

contactsRouter.get("/:contactId", isValidId, getContactById);

contactsRouter.post("/", async (req, res, next) => {
  try {
    const { error } = contactsAddSchema.validate(req.body);

    if (error) {
      throw HttpError(400);
    }

    const newContact = await addContact(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
});

contactsRouter.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const contactToRemove = await removeContact(contactId);

    if (!contactToRemove) {
      throw HttpError(404);
    }

    res.json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
});

contactsRouter.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = contactsAddSchema.validate(req.body);

    if (error) {
      throw HttpError(400, "missing fields");
    }

    const { contactId } = req.params;

    const contactToUpdate = await updateContactById(contactId, req.body);

    if (!contactToUpdate) {
      throw HttpError(404);
    }

    res.json(contactToUpdate);
  } catch (error) {
    next(error);
  }
});

export default contactsRouter;
