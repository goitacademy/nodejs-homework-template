const { getContactById } = require('../../model/contacts/getContactById')

const getById = async (req, res, next) => {
  try {
    const { id } = req.params
    const result = await getContactById(id)
    if (!result) {
      const error = new Error(`Contact with id=${id} not found`)
      error.status = 404
      throw error
    }
    res.json({
      status: 'success',
      code: 200,
      data: {
        result,
      },
    })
  } catch (error) {
    next(error)
  }
}
module.exports = getById
