const { addContact } = require('../../model/contacts')

const postContact = async (req, res, next) => {
  const { name, email, phone } = req.body
  const owner = req.user._id

  const data = await addContact({ name, email, phone, owner })
  res.json({
    status: 'success',
    code: 201,
    data: {
      result: data
    }
  })
}

module.exports = { postContact }
