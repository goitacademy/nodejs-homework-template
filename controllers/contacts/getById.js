const data = require('../../model')

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params
    const contact = await data.getContactById(contactId)

    if (!contact) {
      return res.status(404).json({
        message: 'Not found'
      })
    }

    res.json({
      status: 'success',
      code: 200,
      data: {
        result: contact,
      }
    })
  } catch (error) {
    next(error)
  }
}

module.exports = getById
