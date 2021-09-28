const { NotFound } = require('http-errors')

const { sendSuccessRes } = require('../../helpers')
const { Contact } = require('../../models')

const listContacts = async(req, res) => {
  const result = await Contact.find({})
  sendSuccessRes(res, { result })
}

// const getById = async(req, res) => {
//   const { contactId } = req.params
//   const result = await contactsOperations.getById(contactId)
//   if (!result) {
//     throw new NotFound(`Contact with id=${contactId} not found`)
//   }
//   sendSuccessRes(res, { result })
// }

const add = async (req, res) => {
  const result = await Contact.create(req.body)
  sendSuccessRes(res, { result }, 201)
}

// const updateById = async (req, res) => {
//   const { contactId } = req.params
//   const result = await contactsOperations.updateById(contactId, req.body)
//   if (!result) {
//     throw new NotFound(`Contact with id=${contactId} not found`)
//   }
//   sendSuccessRes(res, { result })
// }

// const removeById = async(req, res) => {
//   const { contactId } = req.params
//   const result = await contactsOperations.removeById(contactId)
//   if (!result) {
//     throw new NotFound(`Contact with id=${contactId} not found`)
//   }

//   sendSuccessRes(res, { message: `Contact with id=${contactId} has been successfully deleted` })
// }

module.exports = {
  listContacts,
  // getById,
  add,
  // updateById,
  // removeById
}
