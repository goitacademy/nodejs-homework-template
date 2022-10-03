const { addContact: addNewContact } = require('../../models/contacts.js')

const addContact = async (req, res) => {
    const result = await addNewContact(req.body);
    res.status(201).json({ status: 'success', code: 201, data: { result } })
}

module.exports = addContact;