const { NotFound } = require('http-errors')

const sendSuccessRes = require('../../helpers/sendSuccessRes')
const contactsOperations = require('../../model/index')

const updateContactById = async(req, res) => {
  const { id } = req.params
  const contact = await contactsOperations.updateContactById(id, req.body)
  if (!contact) {
    throw new NotFound(`Contact with id=${id} not found`)
  }
  sendSuccessRes(res, { contact })
}

module.exports = updateContactById
