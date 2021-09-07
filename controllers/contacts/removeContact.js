const { Contact } = require('../../model')

const removeContact = async (req, res, next) => {
  const { id } = req.params
  const removeContact = await Contact.findByIdAndRemove(id)
  if (!removeContact) {
    res.status(404).json({ message: 'not found' })
  }
  res.json({ message: 'contact deleted', removeContact })
}

module.exports = removeContact
