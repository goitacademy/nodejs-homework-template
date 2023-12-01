
import {
  getContactById,
  listContacts,
  addContact,
} from "../models/contacts.js";
import { HttpError } from "../helpers/index.js";
import { contactsAddSchema } from "../schemas/contacts-schemas.js";



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
      HttpError(404, `Contact with id=${contactId} not found`);
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
    const result = addContact(req.body);

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export default {
  getAll,
  getById,
  add,
};
