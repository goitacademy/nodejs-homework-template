const Contact = require('../model/contact.model')

const getContactById = async (req, res, next) => {
  const id = req.params.contactId

  try {
    const result = await Contact.findOne({ _id: id })

    if (!result) {
      return res.status(404).json({
        status: 'error',
        code: 404,
        message: `Contact with id: ${id}, not found`,
      })
    }

    res.status(200).json({
      status: 'success',
      code: 200,
      data: result
    })
  } catch (error) {
    next(error)
  }
}

module.exports = getContactById
