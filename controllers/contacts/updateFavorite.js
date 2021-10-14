const { NotFound } = require('http-errors')

const { sendSuccessRes } = require('../../helpers')
const { Contact } = require('../../models')

const updateFavorite = async (req, res) => {
  const { id } = req.params
  const { favorite } = req.body
  const result = await Contact.findByIdAndUpdate(id, { favorite }, { new: true })
  if (!result) {
    throw new NotFound('missing field favorite')
  }
  sendSuccessRes(res, { result })
}

module.exports = updateFavorite
