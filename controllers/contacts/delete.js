const actions = require('../../models/contacts')
const createError = require('../../helpers/error')

const remove = async (req, res, next) => {
  try {
    const result = await actions.removeContact(req.params.contactId)
    if (result === null) {
      throw createError(404)
    }
    res.json({ message: 'contact deleted' })
  } catch (error) {
    next(error)
  }
}

module.exports = remove