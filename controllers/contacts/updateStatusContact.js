const NotFound = require('http-errors')
const {Contact} = require('../../models')
const {sendSuccessRes} = require('../../helpers')

const updateStatusContact = async (req, res) => {
  const { id } = req.params
  const {favorite} = req.body
  const result = await Contact.findByIdAndUpdate(id, {favorite}, {new:true})
  if (!result) {
    throw new NotFound(`Product whith id=${id} not found`) }
    sendSuccessRes(res,{result})
}

module.exports = updateStatusContact
