const contacts = require('../../data/contacts.json')
const writeContacts = require('./writeContact')

const deleteContact = (req, res) => {
    const { id } = req.params
    const index = contacts.findIndex((item) => item.id === Number(id))
    const deleteContacts = contacts[index]
    contacts.splice(index, 1)
    writeContacts(contacts)
    res.json({
        status: 'success',
        code: 200,
        data: {
            result: deleteContacts
        }
    })
}

module.exports = deleteContact