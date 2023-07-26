const contacts = require('../models/contacts');

async function add(req, res) {
    const { name, email, phone } = req.body;
    const result = await contacts.addContact(name, email, phone);
    if (result) {
    res.status(201).json(result);
    } else {
    res.status(500).json({ message: 'Failed to add the contact' });
    }
}

module.exports = add;