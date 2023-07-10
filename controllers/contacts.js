const { Contact } = require('../models/contact')
const { HttpError, ctrlWrapper } = require('../helpers');

// Отримання усіх контактів
const getAll = async (req, res) => {
    const result = await Contact.find();
    res.json(result);
}

// Отримання контакту по id
const getById = async (req, res) => {
    const { contactId } = req.params;
  const result = await Contacts.findById(contactId);
    if (!result) {
      throw HttpError(404, "Not found"); // якщо немає контакту з таким id
    }
    res.json(result);
}

// Додавання контакту
const add = async (req, res) => {
    const result = await Contact.create(req.body);
    res.status(201).json(result); // якщо успішно доданий контакт
}

// Редагування контакту
const updateById = async (req, res) => {
    const {contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true}); // якщо не написати {new: true}, то повернеться стара версія об'єкта
    if (!result) {
      throw HttpError(404, "Not found"); // якщо немає контакту з таким id
    }
    res.json(result); 
}

// Редагування контакту (поля favorite)
const updateFavorite = async (req, res) => {
    const {contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true}); // якщо не написати {new: true}, то повернеться стара версія об'єкта
    if (!result) {
      throw HttpError(404, "Not found"); // якщо немає контакту з таким id
    }
    res.json(result); 
}


// Видалення контакту
const deleteById = async (req, res) => {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndRemove(contactId);
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
    updateFavorite: ctrlWrapper(updateFavorite),
    deleteById: ctrlWrapper(deleteById),
}