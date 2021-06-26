const { v4 } = require('uuid')
const { contactSchema } = require('../../utils/validateSchemas')
const writeContact = require('./writeContact')
const contacts = require('../../data/contacts.json')

const addContact = (req, res) => {
    const { error } = contactSchema.validate(req.body)
    if (error) {
        return res.status(400).json({
            status: 'error',
            code: 400,
            message: error.message
        })
    }
    const newContact = { ...req.body, id: v4() }
    contacts.push(newContact)
    writeContact(contacts)
    res.status(201).json({
        status: 'success',
        code: 201,
        data: {
            result: newContact
        }
    })
}

module.exports = addContact