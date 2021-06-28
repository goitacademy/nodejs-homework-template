const { jsonReader } = require('../utils')
const { removeContact } = jsonReader

const remove = async (req, res, next) => {
  const { contactId } = req.params
  try {
    const deletedContact = await removeContact(parseInt(contactId))
    res.json({
      status: 'Contact successfully deleted',
      code: 200,
      result: deletedContact
    })
  } catch (error) {
    next(error)
  }
}

module.exports = remove
