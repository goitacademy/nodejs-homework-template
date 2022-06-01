const {
  getListContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
} = require('../services/contactsServices')

const getListContactsController = async (req, res, next) => {
  try {
    const contacts = await getListContacts()

    return res.status('200')
      .json({ status: 'success', code: '200', data: { contacts } })
  } catch (error) {
    next(error)
  }
}

const getContactByIdController = async (req, res, next) => {
  const { contactId } = req.params
  try {
    const contact = await getContactById(contactId)

    return !contact
      ? res.status('404')
        .json({ status: 'error', code: '404', message: 'Not found' })
      : res.status('200')
        .json({ status: 'success', code: '200', data: { contact } })
  } catch (error) {
    next(error)
  }
}

const addContactController = async (req, res, next) => {
  try {
    const contact = await addContact(req.body)

    return res.status('201')
      .json({ status: 'success', code: '201', data: { contact } })
  } catch (error) {
    next(error)
  }
}

const removeContactController = async (req, res, next) => {
  const { contactId } = req.params
  try {
    const contact = await getContactById(contactId)

    if (contact) {
      await removeContact(contactId)
      return res.status('200')
        .json({
          status: 'success',
          code: '200',
          message: `contact ID:${contact.id} deleted`
        })
    } else {
      return res.status('404')
        .json({ status: 'error', code: '404', message: 'Not found' })
    }
  } catch (error) {
    next(error)
  }
}

const updateContactController = async (req, res, next) => {
  const { contactId } = req.params
  try {
    const contact = await updateContact(contactId, req.body)

    return !contact
      ? res.status('404')
        .json({ status: 'error', code: '404', message: 'Not found' })
      : res.status('200')
        .json({ status: 'success', code: '200', data: { contact } })
  } catch (error) {
    next(error)
  }
}

const updateStatusContactController = async (req, res, next) => {
  const { contactId } = req.params
  try {
    const contact = await updateStatusContact(contactId, req.body)

    return !contact
      ? res.status('400')
        .json({ status: 'error', code: '400', message: 'missing field favorite' })
      : res.status('200')
        .json({ status: 'success', code: '200', data: { contact } })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getListContactsController,
  getContactByIdController,
  addContactController,
  removeContactController,
  updateContactController,
  updateStatusContactController,
}
