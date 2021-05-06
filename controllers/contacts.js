const httpCode = require('../helpers/httpCode')
const actions = require('../model/contacts')

const getAllContacts = async (req, res, next) => {
  try {
    const userId = req.user?._id
    const data = await actions.listContacts(userId, req.query)
    return res.status(httpCode.OK).json({
      data,
      message: 'data loaded',
      status: 'success',
      code: httpCode.OK,
    })
  } catch (err) {
    return res.status(httpCode.BAD_REQUEST).json({
      message: 'data is empty',
      status: 'error',
      code: httpCode.BAD_REQUEST,
    })
  }
}

const getContactById = async (req, res, next) => {
  try {
    const userId = req.user?._id
    const data = await actions.getContactById(userId, req.params.contactId)
    if (data) {
      return res.status(httpCode.OK).json({
      data,
      message: 'data loaded',
      status: 'success',
      code: httpCode.OK,
    })
    } else {
    return res.status(httpCode.NOT_FOUND).json({
      message: "Not found",
      status: 'error',
      code: httpCode.NOT_FOUND,
    })
    }
  } catch (err) {
    next(err)
  }
}

const addContact = async (req, res, next) => {
  try {
    const userId = req.user?._id
    const data = await actions.addContact(userId, req.body)
    return res.status(httpCode.CREATED).json({
      data,
      message: 'contact created',
      status: 'success',
      code: httpCode.CREATED,
    })
  } catch (err) {
    console.log(err);
    return res.status(httpCode.BAD_REQUEST).json({
      message: "missing required name field",
      status: 'error',
      code: httpCode.BAD_REQUEST,
    })
  }
}

const deleteContact = async (req, res, next) => {
  try {
     const userId = req.user?._id
    const data = await actions.removeContact(userId, req.params.contactId)
    if (data) {
      return res.status(httpCode.OK).json({
      data,
      message: 'contact deleted',
      status: 'success',
      code: httpCode.OK,
    })
    } else {
    return res.status(httpCode.NOT_FOUND).json({
      message: "Not found",
      status: 'error',
      code: httpCode.NOT_FOUND,
    })
    }
  } catch (err) {
    next(err)
  }
}

const updateStatusContact = async (req, res, next) => {
  try {
    const userId = req.user?._id
    const data = await actions.updateStatusContact( userId, req.params.contactId, req.body)
    if (data) {
      return res.status(httpCode.OK).json({
      data,
      message: 'contact update',
      status: 'success',
      code: httpCode.OK,
    })
    } else {
    return res.status(httpCode.NOT_FOUND).json({
      message: "Not found",
      status: 'error',
      code: httpCode.NOT_FOUND,
    })
    }
  } catch (err) {
    next(err)
  }
}

const updateContact = async (req, res, next) => {
  try {
    const userId = req.user?._id
    const data = await actions.updateContact(userId, req.params.contactId, req.body)
    if (data) {
      return res.status(httpCode.OK).json({
      data,
      message: 'contact update',
      status: 'success',
      code: httpCode.OK,
    })
    } else {
    return res.status(httpCode.NOT_FOUND).json({
      message: "Not found",
      status: 'error',
      code: httpCode.NOT_FOUND,
    })
    }
  } catch (err) {
    next(err)
  }
}

module.exports = {
    getAllContacts,
    getContactById,
    addContact,
    deleteContact,
    updateStatusContact,
    updateContact,
}