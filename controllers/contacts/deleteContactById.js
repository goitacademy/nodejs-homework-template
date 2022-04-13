const { Contact } = require('../../models')

const deleteContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params
    const result = await Contact.findByIdAndRemove(contactId)
    const auth = JSON.stringify(result.owner) === JSON.stringify(req.user._id)
    if (!auth) {
      res.status(401).json({
        status: 'Unauthorized',
        code: 401,
      })
      return
    }
    if (!result) {
      res.status(404).json({
        status: 'error',
        code: 404,
        message: 'Not found',
      })
      return
    }
    res.json({
      status: 'success',
      code: 200,
      message: 'Remove success',
    })
  } catch (error) {
    next(error)
  }
}

module.exports = deleteContactById
