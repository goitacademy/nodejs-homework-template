const { updateContactById } = require('../../model/contacts/updateContactById')

const updateById = async (req, res, next) => {
  try {
    const { id } = req.params
    const result = await updateContactById(id, req.body)
    if (!result) {
      const error = new Error(`Product with id=${id} not found`)
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

module.exports = updateById
