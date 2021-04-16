/* eslint-disable no-empty */
const { codes } = require('../helpers/constants')
const { ContactService } = require('../services/contatcsService')
const contactsService = new ContactService()

const listContacts = async (req, res, next) => {
  try {
    const userID = req.user.id
    const contacts = await contactsService.listContacts(req.query, userID)
    res.status(codes.OK).json({
      status: 'success',
      message: 'Success',
      code: codes.OK,
      data: {
        ...contacts,
      }
    })
  } catch (err) {
    next(err)
  }
}

const getById = async (req, res, next) => {
  try {
    const userID = req.user.id
    const contact = await contactsService.getById(req.params, userID)
    if (contact) {
      res.status(codes.OK).json({
        status: 'success',
        message: 'Contact is found',
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

const addContact = async (req, res, next) => {
  try {
    const userID = req.user.id
    const contact = await contactsService.addContact(req.body, userID)
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

const removeContact = async (req, res, next) => {
  try {
    const userID = req.user.id
    const contact = await contactsService.removeContact(req.params, userID)
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

const updateContact = async (req, res, next) => {
  if (Object.values(req.body).length === 0) {
    return next({
      status: codes.BAD_REQUEST,
      message: 'Missing fields',
      data: 'Missing fields'
    })
  }
  try {
    const userID = req.user.id
    const contact = await contactsService.updateContact(req.params, req.body, userID)
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
  const updateStatusContact = async (req, res, next) => {
    if (Object.values(req.body).length === 0) {
      return next({
        status: codes.BAD_REQUEST,
        message: 'Missing field favorite',
        data: 'Missing field favorite'
      })
    }
    try {
      const userID = req.user.id
      const contact = await contactsService.updateStatusContact(req.params, req.body, userID)
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

module.exports = { listContacts, getById, addContact, removeContact, updateContact, updateStatusContact }
