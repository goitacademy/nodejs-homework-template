import Contact from "../models/Contact.js";
// ? // Імпорт хелпера для створення помилки ;
import { HttpError } from "../helpers/index.js";
// ? // Імпорт врапера обгортки функцій в try/catch ;
import { ctrlWrapper } from "../decorators/index.js";
// ? // Контроллер обробки запиту на список всіх контактів ;
const getAllContacts = async (req, res) => {
  const result = await Contact.find();
  res.json(result);
};
// ? // Контроллер запиту на один контакт за айді ;
const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  if (!result) {
    throw HttpError(404, `Contact with id: ${contactId} not found`);
  } else {
    res.json(result);
  }
};
// ? // Контроллер запиту додавання нового контакту з тілом запиту;
const addContact = async (req, res) => {
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};
// ? // Контроллер запиту оновлення існуючого контакту за айді;
const updateContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, `Contact with id: ${contactId} not found`);
  } else {
    res.json(result);
  }
};
// ? // Контроллер запиту видалення контакту за айді ;
const removeContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);
  if (!result) {
    throw HttpError(404, `Contact with id: ${contactId} not found`);
  } else {
    res.status(200).json({ message: "Contact deleted successfully" });
  }
};

export default {
  getAllContacts: ctrlWrapper(getAllContacts),
  addContact: ctrlWrapper(addContact),
  getContactById: ctrlWrapper(getContactById),
  updateContactById: ctrlWrapper(updateContactById),
  removeContactById: ctrlWrapper(removeContactById),
};
