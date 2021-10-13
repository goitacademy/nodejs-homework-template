const Contacts = require('../repository/DBindex')

const getContacts = async (req, res, next) => {
  try {
    // console.log(req.method)
    const allContacts = await Contacts.listContacts()
    res.json({ status: 'success', code: 200, data: { allContacts } })
  } catch (error) {
    next(error)
  }
}

const getContactById = async (req, res, next) => {
  try {
    const contact = await Contacts.getContactById(req.params.contactId)
    if (contact) {
      return res
        .status(200)
        .json({ status: 'success', code: 200, data: { contact } })
    }
    return res
      .status(404)
      .json({ status: 'error', code: 404, message: 'Not Found contact' })
  } catch (error) {
    next(error)
  }
}

const addContact = async (req, res, next) => {
    try {
    const contact = await Contacts.addContact(req.body)
    res.status(201).json({ status: 'success', code: 201, data: { contact } })
  } catch (error) {
    next(error)
  }
}

const deleteContact = async (req, res, next) => {
    try {
    const contact = await Contacts.removeContact(req.params.contactId)
    if (contact) {
      return res
        .status(200)
        .json({ status: 'success', code: 200, data: { contact } })
    }
    return res
      .status(404)
      .json({ status: 'error', code: 404, message: 'Not Found contact' })
  } catch (error) {
    next(error)
  }
}

const updateContact = async (req, res, next) => {
  try {
      const contact = await Contacts.updateContact(req.params.contactId, req.body)
      if (contact) {
        return res
          .status(200)
          .json({ status: 'success', code: 200, data: { contact } })
      }
      return res
        .status(404)
        .json({ status: 'error', code: 404, message: 'Not Found contact' })
    } catch (error) {
      next(error)
    }
}

const updateStatusContact = async (req, res, next) => {
  try {
      const contact = await Contacts.updateContact(req.params.contactId, req.body)
      if (contact) {
        return res
          .status(200)
          .json({ status: 'success', code: 200, data: { contact } })
      }
      return res
        .status(404)
        .json({ status: 'error', code: 404, message: 'Not Found contact' })
    } catch (error) {
      next(error)
    }
}

module.exports = {
    getContacts,
    getContactById,
    addContact,
    deleteContact,
    updateContact,
    updateStatusContact,
}