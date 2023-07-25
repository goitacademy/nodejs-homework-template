const { RequestError } = require('../helpers');
const contacts = require('../models/contacts');

async function updateById(req, res) {
    const { contactId } = req.params;
    const result = await contacts.updateContact(contactId, req.body);

    if (!result) {
        throw RequestError(404, 'not found');
    }

    res.status(201).json(result);
}

module.exports = updateById;