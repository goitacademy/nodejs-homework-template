const Contacts = require('../model/index')

// === CREATE ===
const create = async (req, res, next) => {
  try {
    const contact = await Contacts.addContact(req.body)

    return res
      .status(201)
      .json({ status: 'success', code: 201, data: { contact } })
  } catch (error) {
    next(error)
  }
}

// === GET ===
const getAll = async (_req, res, next) => {
  try {
    const contactList = await Contacts.listContacts()

    return res
      .status(200)
      .json({ status: 'success', code: 200, data: { contactList } })
  } catch (error) {
    next(error)
  }
}

// === GET 'Id' ===
const getById = async (req, res, next) => {
  try {
    const contact = await Contacts.getContactById(req.params.contactId)
    if (!contact) {
      return res
        .status(404)
        .json({ status: 'error', code: 404, data: { message: 'Not Found' } })
    }
    return res
      .status(200)
      .json({ status: 'success', code: 200, data: { contact } })
  } catch (error) {
    next(error)
  }
}

// === UPDATE ===
const update = async (req, res, next) => {
  try {
    const contact = await Contacts.updateContact(req.params.contactId, req.body)
    if (!contact) {
      return res
        .status(404)
        .json({ status: 'error', code: 404, data: { message: 'Not Found' } })
    }
    return res
      .status(200)
      .json({ status: 'success', code: 200, data: { contact } })
  } catch (error) {
    next(error)
  }
}

// === REMOVE ===
const remove = async (req, res, next) => {
  try {
    const contact = await Contacts.removeContact(req.params.contactId)
    if (!contact) {
      return res
        .status(404)
        .json({ status: 'error', code: 404, data: { message: 'Not Found' } })
    }
    return res.status(200).json({
      status: 'success',
      code: 200,
      data: { message: 'contact deleted' },
    })
  } catch (error) {
    next(error)
  }
}

module.exports = { create, getAll, getById, update, remove }
