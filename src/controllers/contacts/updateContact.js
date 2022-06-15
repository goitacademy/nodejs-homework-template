const {
  getById,
  updateContact
} = require('../../../models/contacts')

const updateContactController = async (req, res) => {
  const { body, params } = req
  const isExistContact = await getById(params.contactId)

  if(body.length === 0) {
    return res.status(400).json({ 'message': 'missing fields', status: 'failure' })
  }
  else if(isExistContact) { 
    const result = await updateContact(params.contactId, body)
    return res.status(200).json({ body: result, message: 'contact update', status: 'success' })
  }
  else { return res.status(404).json({ message: 'Not found', status: 'failure' }) }
}

module.exports = {
  updateContactController
}
