const Contacts = require('../model/contacts')
const { HttpCode } = require('../helpers/constants')

// === CREATE ===
const create = async (req, res, next) => {
  const userId = req.user.id

  try {
    const contact = await Contacts.addContact({ ...req.body, owner: userId })

    return res
      .status(HttpCode.CREATED)
      .json({ status: 'success', code: HttpCode.CREATED, data: { contact } })
  } catch (error) {
    next(error)
  }
}

// === GET ===
const getAll = async (req, res, next) => {
  try {
    const userId = req.user.id
    const contactList = await Contacts.listContacts(userId)

    return res
      .status(HttpCode.OK)
      .json({ status: 'success', code: HttpCode.OK, data: { contactList } })
  } catch (error) {
    next(error)
  }
}

// === GET 'Id' ===
const getById = async (req, res, next) => {
  const userId = req.user.id

  try {
    const contact = await Contacts.getContactById(req.params.contactId, userId)
    if (!contact) {
      return res.status(HttpCode.NOT_FOUND).json({
        status: 'error',
        code: HttpCode.NOT_FOUND,
        data: { message: 'Not Found' },
      })
    }
    return res
      .status(HttpCode.OK)
      .json({ status: 'success', code: HttpCode.OK, data: { contact } })
  } catch (error) {
    next(error)
  }
}

// === UPDATE ===
const update = async (req, res, next) => {
  const userId = req.user.id

  try {
    const contact = await Contacts.updateContact(
      req.params.contactId,
      req.body,
      userId,
    )
    if (!contact) {
      return res.status(HttpCode.NOT_FOUND).json({
        status: 'error',
        code: HttpCode.NOT_FOUND,
        data: { message: 'Not Found' },
      })
    }
    return res
      .status(HttpCode.OK)
      .json({ status: 'success', code: HttpCode.OK, data: { contact } })
  } catch (error) {
    next(error)
  }
}

// === REMOVE ===
const remove = async (req, res, next) => {
  const userId = req.user.id

  try {
    const contact = await Contacts.removeContact(req.params.contactId, userId)
    if (!contact) {
      return res.status(HttpCode.NOT_FOUND).json({
        status: 'error',
        code: HttpCode.NOT_FOUND,
        data: { message: 'Not Found' },
      })
    }
    return res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: { message: 'contact deleted' },
    })
  } catch (error) {
    next(error)
  }
}

module.exports = { create, getAll, getById, update, remove }
