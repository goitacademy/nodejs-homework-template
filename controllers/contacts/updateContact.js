const createError = require('http-errors');

const { updateContact: updateContactById } = require('../../models/contacts.js')

const updateContact = async (req, res) => {
    const { contactId } = req.params;
    const result = await updateContactById(contactId, req.body)

    if (!result) {
        throw createError(404, `Contact with id=${contactId} not found`)
    }

    res.json({ status: 'success', code: 200, data: { result } })
}

module.exports = updateContact;