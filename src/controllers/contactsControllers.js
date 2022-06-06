const rand = require('random-key')
const {
  listContacts,
  getById,
  removeContact,
  addContact,
  updateContact,
} = require('../../models/contacts')


const getList = async (req, res) => {
  const result = await listContacts()
  return res.status(200).json({ contacts: result, status: 'success' })
}

const getContact = async (req, res, next) => {
  const { contactId } = req.params
  const result = await getById(contactId)

  if(!result) {
    return res.status(404).json({ 'message': 'Not found', status: 'failure' })
  }
  else {
    return res.status(200).json({ contacts: result, status: 'success' })
  }
}

const addContactController = async (req, res) => {
  const { body } = req

  const result = await addContact({id: rand.generateDigits(5).toString(), ...body})

  res.status(201).json({ body: result })
}

const updateContactController = async (req, res) => {
  const { body, params } = req

  if(body.length !== 0) {
    return res.status(400).json({ 'message': 'missing fields', status: 'failure' })
  }

  else {
    try {
      const result = await updateContact(params.contactId, body)
      return res.status(200).json({ body: result, message: 'contact update', status: 'success' })
    } catch {
      return res.status(404).json({ message: 'Not found', status: 'failure' })
    }
  }
}

const deleteContact = async (req, res) => {
  const { contactId } = req.params
  const isExistContact = await getById(contactId)

    if (!isExistContact) {
      return res.status(404).json({ message: 'Not found', status: 'failure' })
    }
    else {
      await removeContact(contactId)
      return res.status(200).json({ message: 'contact deleted', status: 'success' }) 
    }
}

module.exports = {
  getList,
  getContact,
  addContactController,
  updateContactController,
  deleteContact
}
