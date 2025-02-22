const { RequestError } = require('../helpers');
const contacts = require('../models/contacts');

async function getAll(req, res) {
    const result = await contacts.listContacts();

    if (!result) {
        throw RequestError(404, 'Not found');
    }
    res.json(result);
}

module.exports = getAll;
