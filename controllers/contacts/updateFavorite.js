const { NotFound } = require('http-errors')
const { Contact } = require('../../models')
const { sendSuccessRes } = require('../../helpers')

const updateFavorite = async (req, res) => {
  const { contactId } = req.params
  const { favorite } = req.body
  const result = await Contact.findByIdAndUpdate(
    contactId,
    { favorite },
    {
      new: true,
    },
  )
  if (!result) {
    throw new NotFound('missing field favorite')
  }
  sendSuccessRes(res, { data: result })
}

module.exports = updateFavorite
