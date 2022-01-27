const { NotFound } = require('http-error')

const { Contact } = require('../../model/index')

const getContactById = async (req, res, next) => {
  const { contactId } = req.params
  try {
    const contact = await Contact.findById(contactId)
    if (!contact) {
      throw new NotFound()
    }
    res.json(contact)
  } catch (error) {
    if (error.message.includes('Cast to ObjectId failed')) {
      error.status = 400
    }
    next(error)
  }
}
module.exports = {
  getContactById,
}
