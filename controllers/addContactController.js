const { addContactModel } = require('../model')

const addContactController = async (req, res, next) => {
  try {
    const newContact = req.body
    const createdContact = await addContactModel(newContact)
    return res
      .status(201)
      .json({
        status: 'succsess',
        code: 201,
        data: createdContact
      })
  } catch (err) {
    next(err)
  }
}

module.exports = addContactController
