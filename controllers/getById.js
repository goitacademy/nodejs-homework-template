const { RequestError } = require('../helpers');
const contacts = require('../models/contacts');

async function getById(req, res) {
    const {contactId} = req.params;
    const result = await contacts.getContactById(contactId);

    if (!result) {
        throw RequestError(404, 'Not found');
    }
    res.json(result);
}

module.exports = getById;