const { addContact } = require('../../model')
const { schemaBody } = require('../../middlewares/validation/contactValidation')

async function addContactController(req, res) {
  const body = req.body
  const { error } = schemaBody.validate(body)

  if (error) {
    console.log('error - ', error)
    res.status(400).send({ message: error.message })
    return
  }
  const newContact = await addContact(body)
  if (newContact.message) {
    res.status(400).send({ message: newContact.message })
    return
  }
  res.json({
    status: 'Created',
    code: 201,
    data: { result: newContact },
  })
}
module.exports = addContactController
