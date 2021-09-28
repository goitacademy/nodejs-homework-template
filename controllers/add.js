const { addContact } = require('../model/contacts')

const add = async (req, res, next) => {
  const result = await addContact(req.body)
  res.status(201).json({ status: 'success', code: 201, data: { result } })
}

module.exports = add
