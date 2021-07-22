const Contact = require('../model/contact.model')

const listContacts = async (req, res, next) => {
  try {
    const result = await Contact.find()

    res.status(200).json({
      status: 'success',
      code: 200,
      data: result
    })
  } catch (error) {
    res.status(404).json({
      status: 'not found',
      code: 404,
      message: error.message,
    })
    // next(error)
  }
}

module.exports = listContacts
