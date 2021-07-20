const { Contact } = require('../model/contact.model')

const updateStatusContact = async (req, res, next) => {
  const { body } = req.body
  const { contactId } = req.params
  const favorite = req.body.favorite

  // eslint-disable-next-line no-prototype-builtins
  // if (!body.hasOwnProperty('favorite')) {
  if (!favorite) {
    return res.status(400).json({ message: 'missing field favorite' })
  }

  try {
    const result = await Contact.findByIdAndUpdate(contactId, body, { new: true })
    res.status(200).json(result)
  } catch (error) {
    next(error)
  }
}

module.exports = updateStatusContact
