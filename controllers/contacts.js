const { HttpCode } = require('../helpers/constants')
const Contacts = require('../model/index')

const getAllContacts = async (req, res, next) => {
  try {
    const userId = req.user.id
    const { contacts, total, limit, offset } = await Contacts.listContacts(
      userId,
      req.query
    )
    return res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: { total, limit, offset, contacts },
    })
  } catch (e) {
    next(e)
  }
}

const getById = async (req, res, next) => {
  try {
    const userId = req.user.id
    const contact = await Contacts.getContactById(userId, req.params.contactId)
    console.log(contact)
    if (contact) {
      return res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        data: { contact },
      })
    } else {
      return next({
        status: HttpCode.NOT_FOUND,
        message: 'Not found',
        data: 'Not found',
      })
    }
  } catch (e) {
    next(e)
  }
}

const addNewContact = async (req, res, next) => {
  try {
    const userId = req.user.id
    const contact = await Contacts.addContact({ ...req.body, owner: userId })
    if (contact) {
      return res.status(HttpCode.CREATED).json({
        status: 'success',
        code: HttpCode.CREATED,
        data: { contact },
      })
    } else {
      return next({
        status: HttpCode.BAD_REQUEST,
        message: 'missing required name field',
      })
    }
  } catch (e) {
    next(e)
  }
}

const removeSomeContact = async (req, res, next) => {
  try {
    const userId = req.user.id
    const contact = await Contacts.removeContact(userId, req.params.contactId)
    if (contact) {
      return res.status(HttpCode.OK).json({
        status: 'success',
        message: 'contact deleted',
        code: HttpCode.OK,
        data: { contact },
      })
    } else {
      return next({
        status: HttpCode.NOT_FOUND,
        message: 'Not found',
        data: 'Not found',
      })
    }
  } catch (e) {
    next(e)
  }
}

const updateSomeContact = async (req, res, next) => {
  try {
    const userId = req.user.id
    const contact = await Contacts.updateContact(
      userId,
      req.params.contactId,
      req.body
    )
    if (contact) {
      return res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        data: { contact },
      })
    } else {
      return next({
        status: HttpCode.NOT_FOUND,
        message: 'Not found',
        data: 'Not found',
      })
    }
  } catch (e) {
    next(e)
  }
}

const updateStatus = async (req, res, next) => {
  if (Object.keys(req.body).length !== 0) {
    try {
      const userId = req.user.id
      const contact = await Contacts.updateStatusContact(
        userId,
        req.params.contactId,
        req.body
      )
      if (contact) {
        return res.status(HttpCode.OK).json({
          status: 'success',
          code: HttpCode.OK,
          data: { contact },
        })
      } else {
        return next({
          status: HttpCode.NOT_FOUND,
          message: 'Not found',
          data: 'Not found',
        })
      }
    } catch (e) {
      next(e)
    }
  } else {
    return next({
      status: HttpCode.BAD_REQUEST,
      message: 'missing field favorite',
      data: 'missing field favorite',
    })
  }
}

module.exports = {
  getAllContacts,
  getById,
  removeSomeContact,
  addNewContact,
  updateSomeContact,
  updateStatus,
}
