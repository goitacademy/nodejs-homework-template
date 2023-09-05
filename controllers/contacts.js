const { CtrlWrapper, createError } = require("../helpers/");
const contactsMethods = require("../models/contacts");

const getAll = async (req, res, next) => {
  const contacts = await contactsMethods.listContacts();
  res.json(contacts); // Відправка списку контактів у відповідь у форматі JSON
};

const getById = async (req, res, next) => {
  const { contactId } = req.params; // Отримання значення параметра contactId з запиту
  const contact = await contactsMethods.getContactById(contactId);
  if (!contact) {
    throw createError(404, "Not found, man");
  }
  res.json(contact); // Відправка контакту у відповідь у форматі JSON
};

const addContact = async (req, res, next) => {
  const newContact = await contactsMethods.addContact(req.body);
  res.status(201).json(newContact);
};

const deleteContact = async (req, res, next) => {
  const { contactId } = req.params; // Отримання значення параметра contactId з запиту
  const delContact = await contactsMethods.removeContact(contactId);
  if (!delContact) {
    throw createError(404, "Not found");
  }
  res.json(delContact); // Відправка видаленого контакту у відповідь у форматі JSON
};

const updateContact = async (req, res, next) => {
  const { contactId } = req.params; // Отримання значення параметра contactId з запиту
  const updContact = await contactsMethods.updateContact(contactId, req.body);
  if (!updContact) {
    throw createError(404, "Not found");
  }
  res.json(updContact); // Відправка оновленого контакту у відповідь у форматі JSON
};

module.exports = {
  getAll: CtrlWrapper(getAll), // Експорт методу getAll, обгорнутого в CtrlWrapper
  getById: CtrlWrapper(getById), // Експорт методу getById, обгорнутого в CtrlWrapper
  addContact: CtrlWrapper(addContact), // Експорт методу addContact, обгорнутого в CtrlWrapper
  deleteContact: CtrlWrapper(deleteContact), // Експорт методу deleteContact, обгорнутого в CtrlWrapper
  updateContact: CtrlWrapper(updateContact), // Експорт методу updateContact, обгорнутого в CtrlWrapper
};
