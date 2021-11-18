const { removeContact } = require('../../model')
const { schemaId } = require('../../middlewares/validation/contactValidation')

async function removeContactController(req, res) {
  const { contactId } = req.params
  let { error } = schemaId.validate(contactId)

  if (error) {
    console.log('error - ', error)
    res.status(400).send({ message: error.message })
    return
  }
  error = await removeContact(contactId)
  if (error.message) {
    res.status(404).send({ message: error.message })
    return
  }
  res.json({
    status: 'Success',
    code: 200,
    data: { message: 'contact deleted' },
  })
}

module.exports = removeContactController
