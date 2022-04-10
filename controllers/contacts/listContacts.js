const contactsOperations = require('../../models/contacts/operations')

const listContacts = async (req, res, next) => {
    const contacts = await contactsOperations.listContacts()

    res.json({
        status: "success",
        code: 200,
        payload: contacts
    })
    return contacts
}

module.exports = listContacts