const updateById = require('../../model/contacts/updateById')
const { contactSchema } = require('../../contactsSchema')

const changeContact = async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body)
    if (error) {
      error.status = 400
      throw error
    }

    const { contactId } = req.params
    const contact = await updateById(contactId, req.body)
    if (!contact) {
      const error = new Error('missing fields')
      error.status = 404
      throw error
    }
    res.json({
      status: 200,
      data: {
        contact,
      }
    })
  } catch (error) {
    next(error)
  }
}

module.exports = changeContact
