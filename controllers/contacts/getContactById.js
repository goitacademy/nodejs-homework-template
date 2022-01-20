const { NotFound } = require('http-errors')
const { sendSuccessRes } = require('../../helpers')
const { Contact } = require('../../models')

const getContactById = async (req, res) => {
  // const result = await Contact.findOne({ _id: id })
  const { id } = req.params
  const result = await Contact.findById(
    id,
    '_id name email phone favorite',
  ).populate({
    path: 'owner',
    select: '_id email',
  })

  if (!result) {
    throw new NotFound(`Product whith id=${id} not found`)
  }
  sendSuccessRes(res, { result })
}

module.exports = getContactById
