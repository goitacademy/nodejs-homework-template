const createError = require('http-errors');
const { removeContact: removeContactById } = require('../../models/contacts.js')

const removeContact = async (req, res) => {
    const { contactId } = req.params;
    const result = await removeContactById(contactId);

    if (!result) {
        throw createError(404, `Contact with id=${contactId} not found`)
    }

    res.json({ status: 'success', code: 200, data: { result } })
}

module.exports = removeContact;