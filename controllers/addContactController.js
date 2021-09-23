const { addContactModel } = require('../model')

const addContactController = async (req, res, next) => {
  try {
    const newContact = req.body
    console.log(newContact)
    if (Object.keys(newContact).length === 3) {
      const createdContact = await addContactModel(newContact)
      return res
        .status(201)
        .json({
          status: 'succsess',
          code: 201,
          id: createdContact.id,
          data: createdContact
        })
    } else {
      return res
        .json({ status: 'error', code: 500, message: 'Server error' })
    }
  } catch (err) {
    next(err)
  }
}

module.exports = addContactController
