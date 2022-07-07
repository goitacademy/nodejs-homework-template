// const actions = require('../../models/contacts')
const Contact = require('../../models/newContacts')
const createError = require('../../helpers/error')

const getById = async (req, res, next) => {
  try {
    const result = await Contact.findById(req.params.contactId)
    if (!result) {
      throw createError(404)
    }
    res.json(result)
  } catch (error) {
    next(error)
  }
}

module.exports = getById