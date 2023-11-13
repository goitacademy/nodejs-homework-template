import {
  addContact,
  getContactById,
  listContacts,
  removeContact,
  updateContact,
} from "../models/contacts.js";
import { HttpError } from "../helpers/httpError.js";
import {
  contactAddSchema,
  contactUpdateSchema,
} from "../schmes/contactSchemes.js";

export const getAll = async (req, res, next) => {
  try {
    const contacts = await listContacts();

    res.json(contacts);
  } catch (error) {
    next(error);
  }
};

export const getById = async (req, res, next) => {
  try {
    const contact = await getContactById(req.params.id);

    if (!contact) {
      throw HttpError(404, "Not found");
    }

    res.json(contact);
  } catch (error) {
    next(error);
  }
};

export const add = async (req, res, next) => {
  try {
    const { body } = req;
    const { error } = contactAddSchema.validate(body);

    if (error) {
      throw HttpError(400, error.message);
    }

    const newContact = await addContact(body);

    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};

export const deleteById = async (req, res, next) => {
  try {
    const contact = await removeContact(req.params.id);

    if (!contact) {
      throw HttpError(404, "Not found");
    }

    res.json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
};

export const updateById = async (req, res, next) => {
  try {
    const { params, body } = req;
    const { error } = contactUpdateSchema.validate(body);

    if (error) {
      throw HttpError(400, error.message);
    }

    const contact = await updateContact(params.id, body);

    if (!contact) {
      throw HttpError(404, "Not found");
    }

    res.json(contact);
  } catch (error) {
    next(error);
  }
};
