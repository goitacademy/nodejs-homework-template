const Contact = require('../model/contact.model')

const updateStatusContact = async (req, res, next) => {
  const { contactId } = req.params
  const favorite = req.body.favorite

  if (!favorite) {
    return res.status(400).json({ message: 'missing field favorite' })
  }

  try {
    const result = await Contact.findByIdAndUpdate(contactId, { favorite: favorite }, { new: true })
    res.status(200).json(result)
  } catch (error) {
    next(error)
  }
}

module.exports = updateStatusContact
