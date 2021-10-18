const { NotFound } = require('http-errors')

const sendSuccessRes = require('../../helpers/sendSuccessRes')
const contactsOperations = require('../../model/index')

const getContactById = async(req, res) => {
  const { id } = req.params
  const contact = await contactsOperations.getContactById(id)
  if (!contact) {
    throw new NotFound(`Contact with id=${id} not found`)
  }
  sendSuccessRes(res, { contact })
}

module.exports = getContactById
