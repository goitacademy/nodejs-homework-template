const data = require('../../model')

const add = async (req, res, next) => {
  try {
    const newContact = await data.addContact(req.body)
    res.status(201).json({
      status: 'success',
      code: 200,
      data: {
        result: newContact
      }
    })
  } catch (error) {
    next(error)
  }
}

module.exports = add
