const { Contact } = require('../../models/contact')

const add = async (req, res) => {
  const newProduct = { ...req.body, owner: req.user._id }
  const result = await Contact.create(newProduct)
  res.status(201).json({
    status: 'success',
    code: 201,
    data: {
      result,
    },
  })
}

module.exports = add
