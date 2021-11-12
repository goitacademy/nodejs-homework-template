const { BadRequest } = require('http-errors')

const { Contact } = require('../../models')

const addContactCtrl = async (req, res) => {
  if (!req.body) {
    throw new BadRequest('missing required name field')
  }

  const newContact = { ...req.body, owner: req.user._id }
  const data = await Contact.create(newContact)
  res.json({
    status: 'success',
    code: 201,
    data,
  })
}

module.exports = addContactCtrl
