const { NotFound } = require('http-errors')
const {Contact} = require('../../models')
const {sendSuccessRes} = require('../../helpers')

const getContactById = async (req, res) => {
  const { id } = req.params
  const result = await Contact.findById(id, "_id name email phone favorite")
  // const result = await Contact.findOne({ _id: id })
  if (!result) {
    throw new NotFound(`Product whith id=${id} not found`)
  }
  sendSuccessRes(res,{result})
}

module.exports = getContactById


