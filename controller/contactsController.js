// const fs = require('fs/promises')
// const contacts = require('./contacts.json')
const ContactsService = require("../service/contactService.js")
const http = require("../helpers/status.js")
const {contactsSchema, contactStatusSchema} = require("../helpers/validation_schema")

const listContacts = async (req, res, next) => {
  try {
    const contacts = await ContactsService.getAll()
    return res.status(http.OK).json({
      status: "success",
      code: http.OK,
      data: {
        count_all: contacts.length,
        items: contacts,
      }
    })
  } catch (e) {
    return next(e)
  }
}

const getContactById = async (req, res, next) => {
  try {
    const { id } = req.params
    const contact = await ContactsService.getById(id)
    if (!contact) {
      return next({
        status: http.NOT_FOUND,
        message: "Not Found",
        data: 'Not Found'
      })
    }
    return res.status(http.OK).json({
      status: http.OK,
      code: http.OK,
      data: {
        entity: contact
      }
    })
  } catch (e) {
    return next(e)
  }
}

const updateContact = async (req, res, next) => {
  try {
    const { id } = req.params
    const {body} = req
    if (!id) {
      return res.status(http.BAD_REQUEST).json({
        status: "error",
        code: http.BAD_REQUEST,
        message: "id is not specified"
      })
    }
    await contactsSchema.validateAsync(body)
    const contact = await ContactsService.update(id, body)
    if (!contact) {
      return next({
        status: http.NOT_FOUND,
        message: "Not Found",
        data: 'Not Found'
      })
    }
    return res.status(http.UPDATED).json({
      status: http.UPDATED,
      code: http.UPDATED,
      data: {
        entity: contact
      }
    })
  } catch (e) {
    next(e)
  }
}

const addContact = async (req, res, next) => {
  try {
    await contactsSchema.validateAsync(req.body)
    const newContact = await ContactsService.create(req.body)
    return res.status(http.CREATED).json({
      status: http.CREATED,
      code: http.CREATED,
      data: {
        entity: newContact
      }
    })
  } catch (e) {
    next(e)
  }
}

const removeContact = async (req, res, next) => {
  try {
    const { id } = req.params
    if (!id) {
      return res.status(http.BAD_REQUEST).json({
        status: "error",
        code: http.BAD_REQUEST,
        message: "id is not specified"
      })
    }
    const contacts = await ContactsService.remove(id)
    if (!contacts) {
      return next({
        status: http.NOT_FOUND,
        message: "Not Found",
        data: 'Not Found'
      })
    }
    return res.status(http.DELETED).json({
      status: "success",
      code: http.DELETED,
      data: {
        count_all: contacts.length,
        items: contacts,
      }
    })
  } catch (e) {
    next(e)
  }
}

const updateContactStatus = async (req, res, next) => {
  const { id } = req.params
  if (!id) {
    return res.status(http.BAD_REQUEST).json({
      status: "error",
      code: http.BAD_REQUEST,
      message: "id is not specified"
    })
  }
  try {
    await contactStatusSchema.validateAsync(req.body)
    const updatedContact = await ContactsService.updateStatus(id, req.body)
    return res.status(http.CREATED).json({
      status: http.CREATED,
      code: http.CREATED,
      data: {
        entity: updatedContact
      }
    })
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
  updateContactStatus,
}
