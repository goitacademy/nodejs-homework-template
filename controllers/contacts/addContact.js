const { v4 } = require('uuid')

const { contactSchema } = require('../../utils/validateSchemas')

const writeContacts = require('./writeContacts')

const contacts = require('../../model/contacts.json')

const addContact = async (req, res) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const { error } = contactSchema.validate(req.body)
    if (error) {
      res.status(400).json({
        status: 'error',
        code: 404,
        message: error.message,
      })
      return
    }
    const newContact = { ...req.body, id: v4() }
    contacts.push(newContact)
    writeContacts(contacts)
    res.status(201).json({
      status: 'success',
      code: 201,
      data: {
        result: newContact,
      },
    })
  } catch (error) {
    throw (error)
  }
}

module.exports = addContact
