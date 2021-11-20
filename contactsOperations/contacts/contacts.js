const contactsOperations = require('../../model/controllers')

const listContacts = async (req, res, next) => {
   
  const contacts = await contactsOperations.listContacts()
  res.json({
    status: 'success',
    code: 200,
    data: { contacts }
  })
  console.log(req.url)
  console.log(contacts)
}
// listContacts()

const getContactById = async (req, res, next) => {
  console.log(req)
  const { contactId } = req.params
  const contact = await contactsOperations.getContactById(Number(contactId))
  if (!contact) {
    res.status(404).json({
      status: 'error',
      code: 404,
      message: `Contact with id ${contactId} not found`
    })
    return
  }
  res.json(
    {
      status: 'success',
      code: 200,
      contact
    })
  console.log(contact)
}

// getContactById()

const addContact = async (req, res, next) => {
  const result = await contactsOperations.addContact(req.body)
  res.status(201).json({
    status: 'successfully created',
    code: 201,
    result
  })
}

const updateContactById = async (req, res, next) => {
  const { contactId } = req.params
  const result = await contactsOperations.updateContact(Number(contactId), req.body)
  if (!result) {
    res.status(404).json({
      status: 'error',
      code: 404,
      message: `Contact with id ${contactId} not found`
    })
    return
  }
  res.json({
    status: 'successfuly updated',
    code: 202,
    result
  })
}

const removeContactById = async (req, res, next) => {
  const { contactId } = req.params
  const contact = await contactsOperations.removeContact(Number(contactId))
  if (!contact) {
    res.status(404).json({
      status: 'error',
      code: 404,
      message: `Contact with id ${contactId} not found`
    })
    return
  }
  res.json(
    {
      status: 'successfully deleted',
      code: 204
    })
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  updateContactById,
  removeContactById

}
