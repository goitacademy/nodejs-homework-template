const RequestError = require('../../helpers/RequestError');
const contacts = require('../../models/contacts');

const remove = async (req, res) => {
    const { contactId } = req.params;
    const result = await contacts.removeContact(contactId);
    if (!result) {
        throw RequestError(404, 'Not found');
    }
    res.json({
        message: "contact deleted"
    });
}

module.exports = remove;