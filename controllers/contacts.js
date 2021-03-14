const Contacts = require('../model/contacts')

const listContacts = async (_req, res, next) => {
  try {
    const contacts = await Contacts.listContacts()
    return res.json({
      status: 'success',
      code: 200,
      message: {
        contacts,
      },
    })
  } catch (e) {
    next(e)
  }
}

const getContactById = async (req, res, next) => {
  try {
    const contact = await Contacts.getContactById(req.params.contactId)
    if (contact) {
      return res.json({
        status: 'success',
        code: 200,
        message: { contact },
      })
    } else {
      return res.status(404).json({
        status: 'error',
        code: 404,
        message: 'The contact not found',
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
      message: {
        contact,
      },
    })
  } catch (e) {
    next(e)
  }
}

const removeContact = async (req, res, next) => {
  try {
    const contact = await Contacts.removeContact(req.params.contactId)
    if (contact) {
      return res.json({
        status: 'success',
        code: 200,
        message: 'The contact deleted',
      })
    } else {
      return res.status(404).json({
        status: 'error',
        code: 404,
        message: 'The contact not found',
      })
    }
  } catch (e) {
    next(e)
  }
}

const updateContact = async (req, res, next) => {
  try {
    const contact = await Contacts.updateContact(
      req.params.id,
      req.body,
    )
    if (contact) {
      return res.json({
        status: 'success',
        code: 200,
        message: { contact },
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
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
