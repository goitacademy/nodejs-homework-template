const contacts = require('../../data/contacts.json')

const getAllContacts = (req, res, next) => {
    res.json({
        status: 'success',
        code: 200,
        data: {
            result: contacts,
        }
    })
}

module.exports = getAllContacts;