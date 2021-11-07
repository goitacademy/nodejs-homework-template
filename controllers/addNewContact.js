const { addContact } = require('../model/index')

const addNewContact = async (req, res, next) => {
  try {
    console.log(req.body)
    const result = await addContact(req.body)
    res.status(201).json({
      status: 'success',
      code: 201,
      data: {
        result,
      },
    })
  } catch (error) {
    next(error)
  }
}

module.exports = addNewContact
