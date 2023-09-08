import contactsService from "../models/contacts/contacts.js";
// ? // Імпорт хелпера для створення помилки ;
import { HttpError } from "../helpers/index.js";
// ? // Імпорт врапера обгортки функцій в try/catch ;
import ctrlWrapper from "../decorators/ctrlWrapper.js";
// ? // Контроллер обробки запиту на список всіх контактів ;
const getAllContacts = async (req, res) => {
  const result = await contactsService.getAllContacts();
  res.json(result);
};
// ? // Контроллер запиту на один контакт за айді ;
const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactsService.getContactById(contactId);
  if (!result) {
    throw HttpError(404, `Contact with id: ${contactId} not found`);
  } else {
    res.json(result);
  }
};
// ? // Контроллер запиту додавання нового контакту з тілом запиту;
const addContact = async (req, res) => {
  const result = await contactsService.addContact(validateResult);
  res.status(201).json(result);
};
// ? // Контроллер запиту видалення існуючого контакту за айді ;
const removeContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactsService.removeContactById(contactId);
  if (!result) {
    throw HttpError(404, `Contact with id: ${contactId} not found`);
  } else {
    res.status(200).json({ message: "Contact deleted successfully" });
  }
};
// ? // Контроллер запиту оновлення існуючого контакту ;
const updateContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactsService.updateContactById(contactId, req.body);
  if (!result) {
    throw HttpError(404, `Contact with id: ${contactId} not found`);
  } else {
    res.json(result);
  }
};

export default {
  getAllContacts: ctrlWrapper(getAllContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  removeContactById: ctrlWrapper(removeContactById),
  updateContactById: ctrlWrapper(updateContactById),
};
