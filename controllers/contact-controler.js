import Contact from "../models/Contact.js";
import { HttpError } from "../helpers/index.js";
import {
  contactsAddSchema,
  contactsUpdateSchema,
  contactFavoriteSchema,
} from "../models/Contact.js";

const getAllContacts = async (req, res, next) => {
  const { _id: owner } = req.user;
  try {
    const result = await Contact.find({ owner });
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getContactId = async (req, res, next) => {
  // Вказуємо next для пошуку далі
  const { _id: owner } = req.user;
  try {
    const { contactId } = req.params; // Деструктуризуэмо запит req та дістаємо ключ contactId(ключ перед : значення після)
    const result = await Contact.findOne({ _id: contactId, owner });
    if (!result) {
      throw HttpError(404, `Not found`);
    }
    res.json(result);
  } catch (error) {
    next(error); // Вказуємо error для пошук функції яка обробляє помилки
  }
};

const addContact = async (req, res, next) => {
  const { _id: owner } = req.user;

  try {
    const { error } = contactsAddSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await Contact.create({ ...req.body, owner });
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const updateContacts = async (req, res, next) => {
  const { _id: owner } = req.user;
  console.log("Update");
  try {
    const { error } = contactsUpdateSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { contactId } = req.params;

    const result = await Contact.findOneAndUpdate(
      { _id: contactId, owner },
      req.body
    );
    if (!result) {
      throw HttpError(404, `Not found`);
    }
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const updateContactsFiled = async (req, res, next) => {
  const { _id: owner } = req.user;
  try {
    const { error } = contactFavoriteSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { contactId } = req.params;
    const result = await Contact.findOneAndUpdate(
      { _id: contactId, owner },
      req.body
    );

    if (!result) {
      throw HttpError(404, `Not found`);
    }
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const deleteContacts = async (req, res, next) => {
  const { _id: owner } = req.user;
  try {
    const { contactId } = req.params;
    const result = await Contact.findOneAndDelete({ _id: contactId, owner });
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
  updateContactsFiled,
};
