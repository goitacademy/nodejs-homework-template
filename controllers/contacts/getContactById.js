const contactsOperations = require('../../model')

const getContactById = async (req, res, next) => {
  try {
    const { id } = req.params
    const contact = await contactsOperations.getContactById(id)
    if (!contact) {
      return res.status(404).json({
        message: 'Not found'
      })
    }
    res.json({ contact })
  } catch (error) {
    next(error)
  }
}

module.exports = getContactById
