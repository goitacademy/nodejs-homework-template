const contactsOperations = require('../../models/contacts/operations')

const addContact = async (req, res, next) => {
    const result = await contactsOperations.addContact(req.body)

    res.json({
        status: "success",
        code: 201,
        payload: result
    })
}

module.exports = addContact