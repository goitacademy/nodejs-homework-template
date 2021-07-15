
const { Contact } = require('../service')

const updateStatusFavorite = async (req, res, next) => {
  const { contactId } = req.params
  const { favorite = false } = req.body

  try {
    const result = await Contact.findByIdAndUpdate(contactId, { favorite }, { new: true })
    if (result) {
      res.json({
        status: 'success',
        code: 200,
        data: { result },
      })
    } else {
      res.status(404).json({
        status: 'error',
        code: 404,
        message: 'Not found favorite',
        data: 'Not Found',
      })
    }
  } catch (error) {
    next(error)
  }
}

module.exports = updateStatusFavorite
