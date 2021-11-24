const { removeContactById } = require('../../model/contacts/removeContactById')

const deleteById = async (req, res, next) => {
  try {
    const { id } = req.params
    const result = await removeContactById(id)
    if (!result) {
      const error = new Error(`Product with id=${id} not found`)
      error.status = 404
      throw error
    }
    res.json({
      status: 'success',
      code: 200,
      message: 'contact deleted',
      data: {
        result,
      },
    })
  } catch (error) {
    next(error)
  }
}

module.exports = deleteById
