const contacts = require('../models/contacts.js')
const { HttpError, ctrlWrapper } = require('../helpers');

// Отримання усіх контактів
const getAll = async (req, res) => {
    const result = await contacts.listContacts();
    res.json(result);
}

// Отримання контакту по id
const getById = async (req, res) => {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);
    if (!result) {
      throw HttpError(404, "Not found"); // якщо немає контакту з таким id
    }
    res.json(result);
}

// Додавання контакту
const add = async (req, res) => {
    const result = await contacts.addContact(req.body);
    res.status(201).json(result); // якщо успішно доданий контакт
}

// Редагування контакту
const updateById = async (req, res) => {
    const {contactId } = req.params;
    const result = await contacts.updateContact(contactId, req.body);
    if (!result) {
      throw HttpError(404, "Not found"); // якщо немає контакту з таким id
    }
    res.json(result); 
}

// Видалення контакту
const deleteById = async (req, res) => {
    const { contactId } = req.params;
    const result = await contacts.removeContact(contactId);
    if (!result) {
      throw HttpError(404, "Not found"); // якщо немає контакту з таким id
    }
    res.json({message:"Contact deleted"}); 
}

module.exports = {
    getAll: ctrlWrapper(getAll), // обгортаємо функцію в декоратор
    getById: ctrlWrapper(getById),
    add: ctrlWrapper(add),
    updateById: ctrlWrapper(updateById),
    deleteById: ctrlWrapper(deleteById),
}