import Contact from "../models/contact.js";
import { HttpError } from '../helpters/index.js';
import { contactsAddSchema, contactsFavoriteSchema } from "../schemas/joi.js";

export const listContacts = async (req, res, next) => {
  try {
    const allContacts = await Contact.find();

    res.json(allContacts);
  } catch (error) {
    next(error);
  }
};

export const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const foundContact = await Contact.findById(contactId);

    if (!foundContact) {
      throw HttpError(404);
    }

    res.json(foundContact);
  } catch (error) {
    next(error);
  }
};

export const addContact = async (req, res, next) => {
  try {
    const { error } = contactsAddSchema.validate(req.body);

    if (error) {
      throw HttpError(400);
    }

    const newContact = await Contact.create(req.body);

    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};

export const removeContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    await Contact.findByIdAndDelete(contactId);

    res.json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
};

export const updateContactById = async (req, res, next) => {
  try {
    const { error } = contactsAddSchema.validate(req.body);

    if (error) {
      throw HttpError(400, "missing required name field");
    }
    const { contactId } = req.params;

    const contactToUpdate = await Contact.findByIdAndUpdate(
      contactId,
      req.body,
      { new: true }
    );

    res.json(contactToUpdate);
  } catch (error) {
    next(error);
  }
};

export const updateStatusContact = async (req, res, next) => {
  try {
    const { error } = contactsFavoriteSchema.validate(req.body);

    if (error) {
      throw HttpError(400, "missing field favorite");
    }

    const { contactId } = req.params;

    const contactStatus = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });

    if (!contactStatus) {
      throw HttpError(404);
    }

    res.json(contactStatus);
  } catch (error) {
    next(error.message);
  }
};

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById,
  updateStatusContact,
};
