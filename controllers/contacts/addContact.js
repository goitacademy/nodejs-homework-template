const { contacts: service } = require('../../services')

const addContact = async (req, res, next) => {
  const { name, email, phone } = req.body
  try {
    const newContact = await service.add({ name, email, phone })
    if (!newContact) {
      res.status(400).json({
        status: 'error',
        code: 404,
        message: 'Bad request',
      })
      return
    }
    res.status(201).json({
      status: 'success',
      code: 201,
      data: {
        result: newContact,
      },
    })
  } catch (error) {
    next(error)
  }
}

module.exports = addContact
