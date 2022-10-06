const { Contact } = require('../../models/index');

const addContact = async (req, res) => {
    const { id } = req.user;
    const result = await Contact.create({ ...req.body, owner: id });
    res.status(201).json({ status: 'success', code: 201, data: { result } })
}

module.exports = addContact;