const { Contact } = require('../../model')

const updateFavorite = async (req, res, next) => {
  const { id } = req.params
  const { favorite } = req.body
  const result = await Contact.findByIdAndUpdate(id, { favorite }, { new: true })
  if (!result) {
    return res.status(404).json({ message: 'Not found' })
  }
  res.json({ result })
}

module.exports = updateFavorite
