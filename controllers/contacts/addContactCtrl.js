const { addContact } = require('../../model/contacts')
const { joiContactsShcemaAdd } = require('../../middlewares/validation/contactSchema')
const addContactCtrl = async (req, res, next) => {
  const { name, email, phone } = req.body

  try {
    const { error } = joiContactsShcemaAdd.validate(req.body)

    if (error) {
      return res
        .status(400)
        .json({ message: error.message })
    }
    const data = await addContact(name, email, phone)
    res.json({
      status: 'success',
      code: 201,
      data: { data },
    })
  } catch (error) {
    next(error)
  }
}

module.exports = addContactCtrl
