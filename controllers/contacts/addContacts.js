const { contactSchema } = require('../../contactsSchema')
const addContact = require('../../model/contacts/addContact')

const addCont = async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body)
    if (error) {
      error.status = 400
      throw error
    }
    const contacts = await addContact(req.body)
    res.json({
      status: 201,
      data: {
        contacts,
      }
    })
  } catch (error) {
    next(error)
  }
}

module.exports = addCont
