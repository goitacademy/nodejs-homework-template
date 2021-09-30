const contactsOperations = require('../../model')

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params
    const result = await contactsOperations.getContactById(contactId)
    if (!result) {
      const error = new Error(`Conatct with ID=${contactId} not found`)
      error.status = 404
      throw error
      // res.status(404).json({
      //   status: 'error',
      //   code: 404,
      //   message: `Conatct with ID=${contactId} not found`,
      // })
      // return
    }
    res.json({
      status: 'sucess',
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
