const Contact = require('../model/contact.model')

const listContacts = async (req, res, next) => {
  try {
    const result = await Contact.find()

    if (!result) {
      res.status(404).json({
        status: 'error',
        code: 404,
        message: 'Not found'
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

module.exports = listContacts
