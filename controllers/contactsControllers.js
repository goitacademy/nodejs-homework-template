const Contacts = require('../model/index.js')

const getContacts = async (req, res, next) => {
  try {
    const contacts = await Contacts.listContacts()
    res.json({
      status: 'success',
      code: 200,
      data: {
        contacts
      }
    })
  } catch (error) {
    next(error)
  }
}

const getContactById = async (req, res, next) => {
  try {
    const contact = await Contacts.getContactById(req.params.contactId)
    if (contact) {
      res.json({
        status: 'success',
        code: 200,
        data: {
          contact
        }
      })
    } else {
      res.status(404).json({
        status: 'error',
        code: 404,
        data: {
          message: 'Not found'
        }

      })
    }
  } catch (error) {
    next(error)
  }
}

const addContact = async (req, res, next) => {
  try {
    if (req.body.name && req.body.email && req.body.phone) {
      const contact = await Contacts.addContact(req.body)
      res.status(201).json({
        status: 'success',
        code: 201,
        data: {
          contact
        }
      })
    } else {
      res.status(400).json({
        status: 'error',
        code: 400,
        data: {
          message: 'missing required name field'
        }
      })
    }
  } catch (error) {
    next(error)
  }
}

const updateContact = async (req, res, next) => {
  if (Object.keys(req.body).length !== 0) {
    try {
      const contact = await Contacts.updateContact(req.params.contactId, req.body)
      if (contact) {
        res.json({
          status: 'success',
          code: 200,
          data: {
            contact
          }
        })
      } else {
        res.status(404).json({
          status: 'error',
          code: 404,
          data: {
            message: 'Not found'
          }
        })
      }
    } catch (error) {
      next(error)
    }
  } else {
    res.status(400).json({
      status: 'error',
      code: 400,
      data: {
        message: 'missing fields'
      }
    })
  }
}

const removeContact = async (req, res, next) => {
  try {
    const deletedContact = await Contacts.removeContact(req.params.contactId)

    if (deletedContact) {
      res.json({
        status: 'success',
        code: 200,
        data: {
          message: 'Contact deleted',
        }
      })
    } else {
      res.status(404).json({
        status: 'error',
        code: 404,
        data: {
          message: 'Not found'
        }

      })
    }
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact
}
