const { Contact } = require('../../models')

const addNewContact = async (req, res, next) => {
  try {
    const newProduct = { ...req.body, owner: req.user._id }
    const result = await Contact.create(newProduct)
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
