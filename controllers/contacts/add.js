const contacts = require('../../models/contacts');

const add = async (req, res) => {
    const result = await contacts.addContact();
    res.status(201).json(result);
}

module.exports = add;