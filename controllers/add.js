const contacts = require('../models/contacts');

async function add(req, res) {
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
}

module.exports = add;