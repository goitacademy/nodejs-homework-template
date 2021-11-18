const { getContactById } = require('../../model')
const { schemaId } = require('../../middlewares/validation/contactValidation')

async function getContactByIdController(req, res) {
  const { contactId } = req.params
  const { error } = schemaId.validate(parseInt(contactId))

  if (error) {
    console.log('error - ', error)
    res.status(400).send({ message: error.message })
    return
  }
  const contact = await getContactById(contactId)
  if (!contact.length) res.status(404).send({ message: 'Not found' })
  res.json({
    status: 'Success',
    code: 200,
    data: { result: contact },
  })
}

module.exports = getContactByIdController
