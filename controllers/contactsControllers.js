const Contacts = require('../model/contact/contactsModel')
const { HttpCode } = require('../helpers/constants')

const getContacts = async (req, res, next) => {
  try {
    const userId = req.user.id
    const contacts = await Contacts.listContacts(userId)
    res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
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
    const userId = req.user.id
    const contact = await Contacts.getContactById(req.params.contactId, userId)
    if (contact) {
      res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        data: {
          contact
        }
      })
    } else {
      res.status(HttpCode.NOT_FOUND).json({
        status: 'error',
        code: HttpCode.NOT_FOUND,
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
    const userId = req.user.id
    if (req.body.name && req.body.email && req.body.phone) {
      const contact = await Contacts.addContact({ ...req.body, owner: userId })
      res.status(201).json({
        status: 'success',
        code: HttpCode.CREATED,
        data: {
          contact
        }
      })
    } else {
      res.status(HttpCode.BAD_REQUEST).json({
        status: 'error',
        code: HttpCode.BAD_REQUEST,
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
      const userId = req.user.id
      const contact = await Contacts.updateContact(req.params.contactId, req.body, userId)
      if (contact) {
        res.status(HttpCode.OK).json({
          status: 'success',
          code: HttpCode.OK,
          data: {
            contact
          }
        })
      } else {
        res.status(HttpCode.NOT_FOUND).json({
          status: 'error',
          code: HttpCode.NOT_FOUND,
          data: {
            message: 'Not found'
          }
        })
      }
    } catch (error) {
      next(error)
    }
  } else {
    res.status(HttpCode.BAD_REQUEST).json({
      status: 'error',
      code: HttpCode.BAD_REQUEST,
      data: {
        message: 'missing fields'
      }
    })
  }
}

const removeContact = async (req, res, next) => {
  try {
    const userId = req.user.id
    const contact = await Contacts.removeContact(req.params.contactId, userId)

    if (contact) {
      res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        data: {
          message: 'Contact deleted',
          contact,
        }
      })
    } else {
      res.status(HttpCode.NOT_FOUND).json({
        status: 'error',
        code: HttpCode.NOT_FOUND,
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
