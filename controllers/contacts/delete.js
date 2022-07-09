// const actions = require('../../models/contacts')
const Contact = require('../../models/newContacts')
const createError = require('../../helpers/error')

const remove = async (req, res, next) => {
  try {
    const result = await Contact.findByIdAndRemove(req.params.contactId)
    if (result === null) {
      throw createError(404)
    }
    res.json({ message: 'contact deleted' })
  } catch (error) {
    next(error)
  }
}

module.exports = remove