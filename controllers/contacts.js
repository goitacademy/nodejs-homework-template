const { HttpCode } = require('../helpers/constants')
const { ContactsService } = require('../services')
const contactsService = new ContactsService()

const getAll = async (req, res, next) => {
  try {
    const userId = req.user.id
    const contacts = await contactsService.getAll(userId, req.query)
    res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: {
        ...contacts,
      },
    })
  } catch (error) {
    next(error)
  }
}
const getById = async (req, res, next) => {
  try {
    const userId = req.user.id
    const contact = await contactsService.getById(userId, req.params)
    if (contact) {
      return res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        data: {
          contact,
        },
      })
    } else {
      return next({
        status: HttpCode.NOT_FOUND,
        message: 'Not found contact',
        data: 'Not Found',
      })
    }
  } catch (error) {
    next(error)
  }
}

const create = async (req, res, next) => {
  try {
    const userId = req.user.id
    const contact = await contactsService.create(userId, req.body)
    res.status(HttpCode.CREATED).json({
      status: 'success',
      code: HttpCode.CREATED,
      data: {
        contact,
      },
    })
  } catch (error) {
    next(error)
  }
}

const update = async (req, res, next) => {
  try {
    const userId = req.user.id
    const contact = await contactsService.update(userId, req.params, req.body)
    if (contact) {
      return res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        data: {
          contact,
        },
      })
    } else {
      return next({
        status: HttpCode.NOT_FOUND,
        message: 'Not found contact',
        data: 'Not Found',
      })
    }
  } catch (error) {
    next(error)
  }
}

const remove = async (req, res, next) => {
  try {
    const userId = req.user.id
    const contact = await contactsService.remove(userId, req.params)
    if (contact) {
      return res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        data: {
          contact,
        },
      })
    } else {
      return next({
        status: HttpCode.NOT_FOUND,
        message: 'Not found contact',
        data: 'Not Found',
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
  update,
  remove,
}
