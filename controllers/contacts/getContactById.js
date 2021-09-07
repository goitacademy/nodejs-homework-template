const { Contact } = require('../../model')

const getContactById = async (req, res, next) => {
  const { id } = req.params
  const contact = await Contact.findById(id)
  if (!contact) {
    return res.status(404).json({
      message: 'Not found'
    })
  }
  res.json({ contact })
}

module.exports = getContactById
