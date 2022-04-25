const { validation } = require('../../models/validation')
const { Contact } = require('../../models')

module.exports = async (req, res, next) => {
  const id = req.params.contactId
  const body = req.body
  if (!id || !body) {
    res.status(400).json({ message: 'Bad request' })
    return
  }

  const validationResult = validation(req.body)
  if (validationResult.error) {
    res.status(400).json({ message: validationResult.error.details })
    return
  }
  const updatedContact = await Contact.findByIdAndUpdate(id, req.body, {
    new: true,
  })
  res.status(200).json({ status: 'success', data: updatedContact })
}
