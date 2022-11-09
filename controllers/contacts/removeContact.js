const { Contact } = require('../../models/contact')

const { RequestError } = require('../../helpers')

const removeContact = async (req, res, next) => {
  try {
    const { contactId } = req.params
    const result = await Contact.findByIdAndRemove(contactId)
    if (!result) {
      throw RequestError(404, 'Not found')
    }
    res.json({
      message: 'Delete success',
    })
  } catch (error) {
    next(error)
  }
}
module.exports = removeContact
