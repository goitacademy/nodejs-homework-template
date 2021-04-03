/* eslint-disable no-empty */
const { codes } = require('../helpers/constants')
const { ContactService } = require('../services/contatcsService')
const contactsService = new ContactService()

const listContacts = (req, res, next) => {
  try {
    const contacts = contactsService.listContacts()
    res.status(codes.OK).json({
      status: 'succes',
      message: 'Success',
      code: codes.OK,
      data: {
        contacts,
      }
    })
  } catch (err) {
    next(err)
  }
}

const getById = (req, res, next) => {
  try {
    const contact = contactsService.getById(req.params)
    if (contact) {
      res.status(codes.OK).json({
        status: 'success',
        message: 'Contact is founded',
        code: codes.OK,
        data: {
          contact,
        }
      })
    } else {
      next({
        status: codes.NOT_FOUND,
        message: 'Not found',
        data: 'Not found'
      })
    }
  } catch (err) {
    next(err)
  }
}

const addContact = (req, res, next) => {
  try {
    const contact = contactsService.addContact(req.body)
    res.status(codes.CREATED).json({
      status: 'success',
      message: 'Contact is added',
      code: codes.CREATED,
      data: {
        contact,
      }
    })
  } catch (err) {
    next(err)
  }
}

const removeContact = (req, res, next) => {
  try {
    const contact = contactsService.removeContact(req.params)
    if (contact) {
      res.status(codes.OK).json({
        status: 'success',
        message: 'Contact is deleted',
        code: codes.OK,
        data: {
          contact,
        }
      })
    } else {
      next({
        status: codes.NOT_FOUND,
        message: 'Not found',
        data: 'Not found'
      })
    }
  } catch (err) {
    next(err)
  }
}

const updateContact = (req, res, next) => {
  if (Object.values(req.body).length === 0) {
    return next({
      status: codes.BAD_REQUEST,
      message: 'Missing fields',
      data: 'Missing fields'
    })
  }
  try {
    const contact = contactsService.updateContact(req.params, req.body)
    if (contact) {
      res.status(codes.OK).json({
        status: 'success',
        message: 'Contact is updated',
        code: codes.OK,
        data: {
          contact,
        }
      })
    } else {
      next({
        status: codes.NOT_FOUND,
        message: 'Not found',
        data: 'Not found'
      })
    }
  } catch (err) {
    next(err)
  }
}

module.exports = { listContacts, getById, addContact, removeContact, updateContact }
