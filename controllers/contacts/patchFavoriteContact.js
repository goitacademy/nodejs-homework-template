const { Contact } = require('../../models')
const { favoriteValidation } = require('../../models/validation')

module.exports = async (req, res, next) => {
  if (req.body.favorite === undefined) {
    res.status(400).json({ message: 'missing field favorite' })
    return
  }

  const { favorite } = req.body

  console.log('favorite: ', favorite)

  const id = req.params.contactId
  const validationResult = favoriteValidation(req.body)
  if (validationResult.error) {
    res.status(400).json({ message: validationResult.error.details })
    return
  }

  const updateStatusContact = await Contact.findByIdAndUpdate(
    id,
    { favorite },
    { new: true },
  )
  if (!updateStatusContact) {
    res.status(404).json({
      status: 'Error 404',
      message: `Contact with id ${id} is not found`,
    })

    return
  }

  res.json({ status: 'success', data: updateStatusContact })
}
