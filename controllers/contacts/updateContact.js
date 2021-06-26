const contacts = require('../../data/contacts.json')
const { contactSchema } = require('../../utils/validateSchemas')
const writeContacts = require('./writeContact')

const updateContact = (req, res) => {
    const { error } = contactSchema.validate(req.body)
    if (error) {
        return res.status(400).json({
            status: 'error',
            code: 400,
            message: 'Bad request'
        })
    }
    const { id } = req.params
    const index = contacts.findIndex((item) => item.id === Number(id))
    if (index === -1) {
        res.status(404).json({
            status: 'error',
            code: 404,
            message: 'Not found'
        })
        return
    }
    contacts[index] = { ...req.body, id }
    writeContacts(contacts)
    res.json({
        status: 'success',
        code: 200,
        data: {
            result: contacts[index]
        }
    })
}

module.exports = updateContact