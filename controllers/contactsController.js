const { HttpCode } = require('../helpers/constants')

const model = require('../model')

const listContacts = async (request, response, next) => {
  try {
    const listContacts = await model.listContacts()
    response.status(HttpCode.OK).json({
      status: HttpCode.OK,
      code: HttpCode.OK,
      data: { listContacts },
    })
  } catch (error) {
    next(error)
  }
}

const getContactById = async (request, response, next) => {
  try {
    const { contactId } = request.params
    const contact = await model.getContactById(contactId)
    if (contact) {
      response.status(HttpCode.OK).json({
        status: HttpCode.OK,
        code: HttpCode.OK,
        data: { contact },
      })
    } else {
      response.status(HttpCode.NOT_FOUND).json({
        status: HttpCode.NOT_FOUND,
        code: HttpCode.NOT_FOUND,
        message: 'Not found',
        data: 'Not found',
      })
    }
  } catch (error) {
    next(error)
  }
}

const addContact = async (request, response, next) => {
  try {
    const newContact = await model.addContact(request.body)
    response.status(HttpCode.CREATED).json({
      status: HttpCode.CREATED,
      code: HttpCode.CREATED,
      data: {
        ...newContact,
      },
    })
  } catch (error) {
    next(error)
  }
}

const removeContact = async (request, response, next) => {
  try {
    const { contactId } = request.params
    const isDeleted = await model.removeContact(contactId)
    if (isDeleted) {
      response.status(HttpCode.OK).json({
        status: HttpCode.OK,
        code: HttpCode.OK,
        message: 'contact deleted',
      })
    } else {
      response.status(HttpCode.NOT_FOUND).json({
        status: HttpCode.NOT_FOUND,
        code: HttpCode.NOT_FOUND,
        message: 'Not found',
        data: 'Not found',
      })
    }
  } catch (error) {
    next(error)
  }
}

const updateContact = async (request, response, next) => {
  try {
    const { contactId } = request.params
    const updatedContact = await model.updateContact(contactId, request.body)

    if (updatedContact.updateStatus) {
      response.status(HttpCode.OK).json({
        status: HttpCode.OK,
        code: HttpCode.OK,
        data: updatedContact.updated,
      })
    } else {
      response.status(HttpCode.NOT_FOUND).json({
        status: HttpCode.NOT_FOUND,
        code: HttpCode.NOT_FOUND,
        message: 'Not found',
        data: 'Not found',
      })
    }
  } catch (error) {
    next(error)
  }
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
}
