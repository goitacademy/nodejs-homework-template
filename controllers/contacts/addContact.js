const { Contact } = require('../../models/contact')
const { ctrlWrapper } = require('../../helpers');

// Додавання контакту
const addContact = async (req, res) => {
    const result = await Contact.create(req.body);
    res.status(201).json(result); // якщо успішно доданий контакт
}

module.exports = {
    addContact: ctrlWrapper(addContact),
}