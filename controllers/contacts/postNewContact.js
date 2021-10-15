const { Contact } = require('../../models/contact')

const postNewContact = async (req, res, next) => {
  const { _id } = req.user
  console.log('_id :>> ', _id)
  console.log('req.body', req.body)
  const newContact = { ...req.body, owner: _id }
  const result = await Contact.create(newContact)
  res.status(201).json({
    status: 'success',
    code: 201,
    data: { result }
  })
}

module.exports = postNewContact
