const contactsOperations = require('../../models/contacts');

const getAll = async (req, res) => {
    const allContacts = await contactsOperations.listContacts();
    res.json(allContacts);
}

module.exports = getAll;