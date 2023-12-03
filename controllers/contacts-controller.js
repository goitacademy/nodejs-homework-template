import {
  getContactById,
  listContacts,
  addContact,
  updateContactById,
  removeContact
} from "../models/contacts.js";
import { HttpError } from "../helpers/index.js";
import {
  contactsAddSchema,
  contactsUpdateSchema,
} from "../schemas/contacts-schemas.js";

const getAll = async (req, res, next) => {
  try {
    const result = await listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await getContactById(contactId);
    if (!result) {
      HttpError(404, `Not found`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const add = async (req, res, next) => {
  try {
    //перевіряю на вимоги по contactsAddSchema, якщо є помилка, то вона зберігається в полі error
    const { error } = contactsAddSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await addContact(req.body);

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const removeById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await removeContact(contactId)
    if (!result) {
      throw HttpError(404, "Not found")
    }
    res.json({message: "contact deleted"})

  } catch (error) {
    next(error)
  }
};

const updateById = async (req, res, next) => {
  try {
    const { error } = contactsUpdateSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { contactId } = req.params;
    const result = await updateContactById(contactId, req.body);

    if (!result) {
      throw HttpError(404, "Not found")
    }

    res.json(result)
  } catch (error) {}
};

export default {
  getAll,
  getById,
  add,
  removeById,
  updateById,
};
