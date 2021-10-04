const Contacts = require('../services/contactService')

const listContacts = async (_req, res, next) => {
  try {
    const contacts = await Contacts.listContacts()
    return res.json({
      status: 'success',
      code: 200,
      data: {
        contacts,
      },
    })
  } catch (e) {
    next(e)
  }
}

const getContactById = async (req, res, next) => {
  const {
    params: { contactId },
  } = req

  try {
    const contact = await Contacts.getContactById(contactId)
    if (contact) {
      return res.json({
        status: 'success',
        code: 200,
        data: {
          contact,
        },
      })
    } else {
      return res.status(404).json({
        status: 'error',
        code: 404,
      })
    }
  } catch (e) {
    next(e)
  }
}

const addContact = async (req, res, next) => {
  try {
    const contact = await Contacts.addContact(req.body)
    return res.status(201).json({
      status: 'success',
      code: 201,
      data: {
        contact,
      },
    })
  } catch (e) {
    next(e)
  }
}

const updateContact = async (req, res, next) => {
  const {
    body,
    params: { contactId },
  } = req
  try {
    const contact = await Contacts.updateContact(contactId, body)
    if (contact) {
      return res.json({
        status: 'success',
        code: 200,
        data: {
          contact,
        },
      })
    } else {
      return res.status(404).json({
        status: 'error',
        code: 404,
        message: 'Not Found',
      })
    }
  } catch (e) {
    next(e)
  }
}

const removeContact = async (req, res, next) => {
  const {
    params: { contactId },
  } = req

  try {
    const contact = await Contacts.removeContact(contactId)
    if (contact) {
      return res.json({
        status: 'success',
        code: 200,
        data: {
          contact,
        },
      })
    } else {
      return res.status(404).json({
        status: 'error',
        code: 404,
      })
    }
  } catch (e) {
    next(e)
  }
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
}
