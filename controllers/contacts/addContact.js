const { Contact } = require('../../models/contact')
const { ctrlWrapper } = require('../../helpers');

// Додавання контакту
const addContact = async (req, res) => {
    const { _id: owner } = req.user; // беремо id (користувача, який додав контакт) і перейменовуємо в owner
    const result = await Contact.create({ ...req.body, owner });
    res.status(201).json(result); // якщо успішно доданий контакт
}

module.exports = {
    addContact: ctrlWrapper(addContact),
}