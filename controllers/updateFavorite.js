const { Contact } = require('../model')

const updateFavorite = async (req, res, next) => {
  try {
    const { contactId } = req.params
    const { favorite } = req.body

    if (!favorite) {
      return res.status(400).json({
        message: 'missing required field favorite',
      })
    }

    const contact = await Contact.findByIdAndUpdate(contactId, { favorite }, { new: true })

    if (!contact) {
      return res.status(404).json({
        message: 'Not found required contact',
      })
    }

    res.status(200).json({ contact })
  } catch (error) {
    next(error)
  }
}

module.exports = updateFavorite
