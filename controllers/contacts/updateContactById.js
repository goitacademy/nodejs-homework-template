const { Contact } = require('../../models/contact')

const requestError = require('../../helpers/requestError')

const updateContactById = async (req, res) => {
  const { id } = req.params

  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true })
  if (!result) {
    throw requestError(404, 'Not Found')
  }
  res.status(200).json(result)
}

module.exports = updateContactById
