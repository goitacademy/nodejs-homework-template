const NotFound = require('http-errors')
const {Contact} = require('../../models')
const {sendSuccessRes} = require('../../helpers')

const updateContact = async (req, res) => {
  const { id } = req.params
  const result = await Contact.findByIdAndUpdate(id, req.body, {new:true})
  if (!result) {
    throw new NotFound(`Product whith id=${id} not found`) }
    sendSuccessRes(res,{result})
}

module.exports = updateContact
