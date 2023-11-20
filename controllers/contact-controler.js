import Contact from "../models/Contact.js";
import contactService from "../models/contacts.js";
import { HttpError } from "../helpers/index.js";
import {
  contactsAddSchema,
  contactsUpdateSchema,
} from "../schemas/contact-schema.js";

const getAllContacts = async (req, res, next) => {
  try {
    const result = await Contact.find();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getContactId = async (req, res, next) => {
  // Вказуємо next для пошуку далі
  try {
    const { contactId } = req.params; // Деструктуризуэмо запит req та дістаємо ключ contactId(ключ перед : значення після)
    const result = await Contact.findById(contactId);
    if (!result) {
      throw HttpError(404, `Not found`);
    }
    res.json(result);
  } catch (error) {
    next(error); // Вказуємо error для пошук функції яка обробляє помилки
  }
};

const addContact = async (req, res, next) => {
  try {
    const { error } = false;
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await Contact.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const updateContacts = async (req, res, next) => {
  try {
    const { error } = contactsUpdateSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body);
    if (!result) {
      throw HttpError(404, `Not found`);
    }
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const deleteContacts = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactService.deleteContact(contactId);
    if (!result) {
      throw HttpError(404, `Not found`);
    }
    res.json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
};

export default {
  getAllContacts,
  getContactId,
  addContact,
  updateContacts,
  deleteContacts,
};
