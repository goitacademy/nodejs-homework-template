const { Contact } = require('../../models/contacts');

const getAllContacts = async (req, res, next) => {
    // Вторым аргументом просто в строку можно передать
    // в find({"name phone"}) список что нужно
    // а если все кроме то пиши дефис find({"-phone"})
    const result = await Contact.find({});
    res.json(result);
};

module.exports = getAllContacts;
