const { Contact } = require('../../models/contact')

const requestError = require('../../helpers/requestError')

const removeContact = async (req, res) => {
  const { id } = req.params
  const result = await Contact.findByIdAndRemove(id)
  if (!result) {
    throw requestError(404, 'Not found')
  }
  res.json({
    message: 'Contact deleted',
  })
}

module.exports = removeContact
