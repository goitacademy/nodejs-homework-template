const contactsOperations = require('../model')
const {sendSuccessRes} = require('../helpers')

const getAll = async (req, res) => {
  const result = await contactsOperations.getAll()
  sendSuccessRes(res,{result})
}


module.exports = getAll
