const createError = require('http-errors');

const { Contact } = require('../../models/index');

const removeContact = async (req, res) => {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndRemove(contactId);

    if (!result) {
        throw createError(404, `Contact with id=${contactId} not found`)
    }

    res.json({ status: 'success', code: 200, data: { result } })
}

module.exports = removeContact;