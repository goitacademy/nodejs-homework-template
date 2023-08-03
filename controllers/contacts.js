const { CtrlWrapper, HttpErrors } = require("../helpers/"); // Підключення модулів CtrlWrapper і HttpErrors з папки helpers
const contactsMethods = require("../models/contacts"); // Підключення модуля contactsMethods з папки models/contacts

const getAll = async (req, res, next) => {
  const list = await contactsMethods.listContacts(); // Виклик методу listContacts модуля contactsMethods для отримання списку контактів
  res.json(list); // Відправка списку контактів у відповідь у форматі JSON
};

const getById = async (req, res, next) => {
  const { contactId } = req.params; // Отримання значення параметра contactId з запиту

  const contact = await contactsMethods.getContactById(contactId); // Виклик методу getContactById модуля contactsMethods для отримання контакту за його ідентифікатором

  if (!contact) {
    throw HttpErrors(404, "Not found, man"); // Генерація об'єкта помилки HttpErrors зі статусом 404 та повідомленням "Not found, man"
  }

  res.json(contact); // Відправка контакту у відповідь у форматі JSON
};

const addContact = async (req, res, next) => {
  const newContact = await contactsMethods.addContact(req.body); // Виклик методу addContact модуля contactsMethods для додавання нового контакту з отриманими даними з тіла запиту
  res.status(201).json(newContact); // Встановлення статусу відповіді 201 (Створено) та відправка створеного контакту у відповідь у форматі JSON
};

const deleteContact = async (req, res, next) => {
  const { contactId } = req.params; // Отримання значення параметра contactId з запиту

  const delContact = await contactsMethods.removeContact(contactId); // Виклик методу removeContact модуля contactsMethods для видалення контакту за його ідентифікатором

  if (!delContact) {
    throw HttpErrors(404, "Not found"); // Генерація об'єкта помилки HttpErrors зі статусом 404 та повідомленням "Not found"
  }

  res.json(delContact); // Відправка видаленого контакту у відповідь у форматі JSON
};

const updateContact = async (req, res, next) => {
  const { contactId } = req.params; // Отримання значення параметра contactId з запиту

  const updContact = await contactsMethods.updateContact(contactId, req.body); // Виклик методу updateContact модуля contactsMethods для оновлення контакту за його ідентифікатором з отриманими даними з тіла запиту

  if (!updContact) {
    throw HttpErrors(404, "Not found"); // Генерація об'єкта помилки HttpErrors зі статусом 404 та повідомленням "Not found"
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
