const { NotFound } = require('http-errors')
const contactsOperations = require('../model')
const {sendSuccessRes} = require('../helpers')

const getContactById = async (req, res) => {
  const { id } = req.params
  const result = await contactsOperations.getContactById(id)
  if (!result) {
    throw new NotFound(`Product whith id=${id} not found`)
  }
  sendSuccessRes(res,{result})
}

module.exports = getContactById
