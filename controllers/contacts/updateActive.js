const { NotFound } = require('http-errors')
const { sendSuccessRes } = require('../../helpers')
const { Contact } = require('../../models')

const updateActive = async (req, res) => {
  const { contactId } = req.params
  const { favorite } = req.body
  const result = await Contact.findByIdAndUpdate(
    contactId,
    { favorite },
    { new: true },
  )
  if (!result) {
    throw new NotFound('Not found')
  }
  sendSuccessRes(res, { result })
}
module.exports = updateActive
