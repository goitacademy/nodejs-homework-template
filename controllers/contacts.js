const { NotFound } = require('http-errors')
const contactsOperations = require('../model/contacts')
const { sendSuccessResponse } = require('../helpers')

const listContacts = async (req, res) => {
  const result = await contactsOperations.listContacts()
  sendSuccessResponse(res, { result })

  //   const contacts = await contactsOperations.listContacts()
  //   res.json({
  //     message: 'success',
  //     code: 200,
  //     data: {
  //       result: contacts,
  //     },
  //   })
}

const getContactById = async (req, res) => {
  const { contactId } = req.params
  console.log(req.params)
  const result = await contactsOperations.getContactById(contactId)
  if (!result) {
    // instead of create new Error just use createError from http-error package
    // const error = new Error(`Contact with id '${contactId}' not found`)
    // error.status = 404
    // throw error
    throw new NotFound(`Contact with id '${contactId}' not found`)
    // ======== more correctly write error as we see above
    // res.status(404).json({
    //   status: 'error',
    //   code: 404,
    //   message: `Product with id${id} not found`,
    // })
    // return
    // ==============================
  }
  sendSuccessResponse(res, { result })
  //   res.json({
  //     message: 'success',
  //     code: 200,
  //     data: {
  //       result,
  //     },
  //   })
}

const addContact = async (req, res) => {
  //   const { error } = contactSchema.validate(req.body)
  //   if (error) {
  //     throw new BadRequest(error.message)
  // const err = new Error(error.message)
  // err.status = 400
  // throw err
  //   }
  const result = await contactsOperations.addContact(req.body)
  //   console.log(req.body)
  sendSuccessResponse(res, { result }, 201)
  //   res.status(201).json({
  //     status: 'success',
  //     code: 201,
  //     data: {
  //       result,
  //     },
  //   })
}

const updateContact = async (req, res) => {
  //   const { error } = contactSchema.validate(req.body)
  //   if (error) {
  //     throw new BadRequest(error.message)
  //   }
  const { contactId } = req.params
  const result = await contactsOperations.updateContact(contactId, req.body)
  if (!result) {
    throw new NotFound(`Contact with id '${contactId}' not found`)
    // const error = new Error(`Contact with id=${contactId} not found`)
    // error.status = 404
    // throw error
  }
  sendSuccessResponse(res, { result })
  //   res.json({
  //     result: 'success',
  //     code: 200,
  //     data: {
  //       result,
  //     },
  //   })
}

const removeContact = async (req, res) => {
  const { contactId } = req.params
  const result = await contactsOperations.removeContact(contactId)
  if (!result) {
    throw new NotFound(`Contact with id '${contactId}' not found`)
  }

  sendSuccessResponse(res, { message: 'Contact successfully deleted' })

  // если указать res.status(204).json({}) то никакой объект обратно не приходит, какой-бы мы не указали
  //   res.json({
  //     status: 'success',
  //     code: 200,
  //     message: 'Contact successfully deleted',
  //   })
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
}
