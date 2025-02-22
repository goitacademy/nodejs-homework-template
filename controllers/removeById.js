const { RequestError } = require('../helpers');
const contacts = require('../models/contacts');

async function removeById(req, res) {
    const { contactId } = req.params;
    const result = await contacts.removeContact(contactId);

    if (!result) {
        throw RequestError(404, 'Not found');
    }
    res.json({ message: 'The contact has been deleted' });
}

module.exports = removeById;