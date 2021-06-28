const { jsonReader } = require('../utils')
const { getContactById } = jsonReader

const getOne = async (req, res, next) => {
  const { contactId } = req.params
  try {
    const result = await getContactById(parseInt(contactId))
    if (!result) {
      return res.status(404).json({
        status: 'error',
        code: 404,
        message: 'Contact not found'
      })
    }
    res.json({
      status: 'success',
      code: 200,
      result
    })
  } catch (error) {
    next(error)
  }
}

module.exports = getOne
