const contactsOperations = require('../../model/contacts/contactsOperations')

const listContacts = async (req, res, next) => {
  const contacts = await contactsOperations.listContacts()
  res.json({
    status: 'success',
    code: 200,
    contacts
  })
}

const getById = async (req, res, next) => {
  const { contactId } = req.params
  const contact = await contactsOperations.getById(Number(contactId))
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
}

const add = async (req, res, next) => {
  const result = await contactsOperations.addContact(req.body)
  res.status(201).json({
    status: 'successfully created',
    code: 201,
    result
  })
}

const updateById = async (req, res, next) => {
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

const removeById = async (req, res, next) => {
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
  getById,
  add,
  updateById,
  removeById

}
