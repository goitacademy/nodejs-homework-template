const Contacts = require('../services/contactsServices')
const { WrongParametersError, NotFoundError } = require('../helpers/errors')

const {
  addContactSchema,
  updateContactSchema,
  updateStatusContactSchema
} = require('../middlewares/contactsValidation')

const listContacts = async (req, res, next) => {
  const { _id } = req.user
  try {
    const contacts = await Contacts.listContacts(_id)
    res.status(200).json({ contacts })
  } catch (error) {
    next(error)
  }
}

const getContactById = async (req, res, next) => {
  const { contactId } = req.params
  const { _id } = req.user
  try {
    const contact = await Contacts.getContactById(contactId, _id)
    if (contact) {
      return res.status(200).json({ contact })
    }
    throw new NotFoundError('Not found')
  } catch (error) {
    next(error)
  }
}

const addContact = async (req, res, next) => {
  const { _id } = req.user
  const { error } = addContactSchema.validate(req.body)
  if (error) {
    throw new WrongParametersError('missing required field')
  }
  try {
    const contact = await Contacts.addContact(req.body, _id)
    res.status(201).json({ contact, status: 'success' })
  } catch (error) {
    next(error)
  }
}

const removeContact = async (req, res, next) => {
  const { contactId } = req.params
  const { _id } = req.user
  try {
    const result = await Contacts.removeContact(contactId, _id)

    if (result) {
      return res.status(200).json({ message: `contact ${contactId} deleted` })
    }
    throw new NotFoundError('Not found')
  } catch (error) {
    next(error)
  }
}

const updateContact = async (req, res, next) => {
  const { contactId } = req.params
  const { _id } = req.user
  const { body } = req
  const { error } = updateContactSchema.validate(req.body)
  if (error) {
    throw new WrongParametersError('missing fields')
  }
  try {
    const contact = await Contacts.updateContact(contactId, body, _id)

    if (contact) {
      return res.status(200).json({ contact, status: 'success' })
    }
    throw new NotFoundError('Not found')
  } catch (error) {
    next(error)
  }
}

const updateStatusContact = async (req, res, next) => {
  const { contactId } = req.params
  const { body } = req
  const { _id } = req.user
  const { error } = updateStatusContactSchema.validate(req.body)
  if (error) {
    throw new WrongParametersError('missing field favorite')
  }
  try {
    const contact = await Contacts.updateContact(contactId, body, _id)
    if (contact) {
      return res.status(200).json({ contact, status: 'success' })
    }
    throw new NotFoundError('Not found')
  } catch (error) {
    next(error)
  }
}

// const listContacts = async (req, res, next) => {
//   const { _id } = req.user
//   try {
//     const contacts = await Contacts.listContacts(_id)
//     res.status(200).json({ contacts })
//   } catch (error) {
//     next(error)
//   }
// }
const getFavoriteContacts = async (req, res, next) => {
  const { _id } = req.user
  // const { favorite } = req.params
  // console.log(favorite)
  try {
    const contacts = await Contacts.getFavoriteContacts(_id)
    res.status(200).json({ contacts })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
  getFavoriteContacts
}
