const { Contact } = require('../../models')

const updateFavorite = async (req, res, next) => {
  try {
    const { contactId } = req.params
    const { favorite } = req.body
    const contact = await Contact.findByIdAndUpdate(
      contactId,
      { favorite },
      {
        new: true,
      },
    )
    if (!contact) {
      return res.status(404).json({ message: 'Not found' })
    }
    res.status(201).json({ contact })
  } catch (error) {
    next(error)
  }
}

module.exports = updateFavorite
