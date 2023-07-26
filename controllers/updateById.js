const { RequestError } = require('../helpers');
const contacts = require('../models/contacts');

async function updateById(req, res) {
    const { contactId } = req.params;
    const result = await contacts.updateContact(contactId, req.body);

    if (result) {
        res.status(201).json(result);
    } else {
        throw RequestError(404, 'Not found');
    }
}

module.exports = updateById;