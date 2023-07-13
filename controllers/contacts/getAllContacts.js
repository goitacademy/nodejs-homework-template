const { Contact } = require('../../models/contact')
const { ctrlWrapper } = require('../../helpers');

// Отримання усіх контактів
const getAllContacts = async (req, res) => {
    const result = await Contact.find();
    res.json(result);
}

module.exports = {
    getAllContacts: ctrlWrapper(getAllContacts),
}