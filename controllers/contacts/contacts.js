const contactsOperations = require('../../model/contactsOperations')

const listContacts = async (req, res) => {
  const contacts = await contactsOperations.listContacts()
  res.json({
    status: 'success',
    code: 200,
    data: { contacts },
  })
}

const getContactById = async (req, res) => {
  const { contactId } = req.params
  console.log((contactId))
  const contact = await contactsOperations.getContactById((contactId))
  if (!contact) {
    res.status(404).json({
      status: 'error',
      code: 404,
      message: `Contact with id ${contactId} not found`,
    })
    return
  }
  res.json({
    status: 'success',
    code: 200,
    contact,
  })
}

const addContact = async (req, res) => {
  const result = await contactsOperations.addContact(req.body)
  res.status(201).json({
    status: 'successfully created',
    code: 201,
    result,
  })
}

const updateContactById = async (req, res) => {
  const { contactId } = req.params
  const result = await contactsOperations.updateContactById(
    contactId,
    req.body
  )
  if (!result) {
    res.status(404).json({
      status: 'error',
      code: 404,
      message: `Contact with id ${contactId} not found`,
    })
    return
  }
  res.json({
    status: 'successfuly updated',
    code: 200,
    result
  })
}

const removeContactById = async (req, res) => {
  const { contactId } = req.params
  const contact = await contactsOperations.removeContact((contactId))
  if (!contact) {
    res.status(404).json({
      status: 'error',
      code: 404,
      message: `Contact with id ${contactId} not found`,
    })
    return
  }
  res.json({
    status: 'successfully deleted',
    code: 200,
  })
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  updateContactById,
  removeContactById,
}
