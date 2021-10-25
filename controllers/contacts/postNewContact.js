const gravatar = require('gravatar')
const { Contact } = require('../../models/contact')

const postNewContact = async (req, res, next) => {
  console.log('req.body :>> ', req.body)
  const { _id } = req.user
  console.log('_id :>> ', _id)
  const { email } = req.body
  const newContact = { ...req.body, avatarURL: gravatar.url(email), owner: _id }
  const result = await Contact.create(newContact)
  console.log('result :>> ', result)
  res.status(201).json({
    status: 'success',
    code: 201,
    data: result
  })
}

module.exports = postNewContact
