const { Contact } = require('../model')

const addContact = async (req, res, next) => {
  try {
    const result = await Contact.create(req.body)

    res.json({
      status: 'success',
      code: 201,
      data: { result },
      message: 'Contact added',
    })
  } catch (error) {
    next(error)
  }
}

module.exports = addContact
