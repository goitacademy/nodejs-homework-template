const { HttpCode } = require('../helpers/constants')
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../model/contacts')

const getAll = async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: {
        contacts,
      }
    })
  } catch (error) {
    next(error)
  }
}

const getById = async (req, res, next) => {
  try {
    const contact = await getContactById(req.params.contactId)
    if (contact) {
      return res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        data: {
          contact,
        }
      })
    } else {
      return next({
        status: HttpCode.NOT_FOUND,
        message: 'Not Found contact',
        data: 'Not Found'
      })
    }

  } catch (error) {
    next(error)
  }
}

const create = async (req, res, next) => {
  try {
    const newContact = await addContact(req.body)
    res.status(HttpCode.CREATED).json({
      status: 'success',
      code: HttpCode.CREATED,
      data: {
        newContact,
      }
    })
  } catch (error) {
    next(error)
  }
}

const remove = async (req, res, next) => {
  try {
    const contact = await removeContact(req.params)
    if (contact) {
      return res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        data: {
          contact,
        }
      })
    } else {
      return next({
        status: HttpCode.NOT_FOUND,
        message: 'Not Found contact',
        data: 'Not Found'
      })
    }

  } catch (error) {
    next(error)
  }
}

const update = async (req, res, next) => {
  try {
    const contact = updateContact(req.params, req.body)
    if (contact) {
      return res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        data: {
          contact,
        }
      })
    } else {
      return next({
        status: HttpCode.NOT_FOUND,
        message: 'Not Found contact',
        data: 'Not Found'
      })
    }

  } catch (error) {
    next(error)
  }
}

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update
}