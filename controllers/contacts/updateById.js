// const contactsOperations = require('../../model/contacts')
// const sendSuccessResponse = require('../../helpers')
// const { NotFound } = require('http-errors')

// const updateById = async (req, res) => {
//   const { id } = req.params
//   const result = await contactsOperations.updateById(id, req.body)
//   if (!result) {
//     throw new NotFound(`Contact with id=${id} not found`)
//   }
//   sendSuccessResponse(res, { result })
// }

// module.exports = updateById
