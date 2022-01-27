const { NotFound, BadRequest } = require('http-error')
const { Contact } = require('../../model/index')

const updateStatusContact = async (req, res, next) => {
  const { contactId } = req.params
  const { favorite } = req.body

  try {
    if (!favorite) {
      throw new BadRequest('missing field favorite')
    }
    const updateContact = await Contact.findByIdAndUpdate(
      contactId,
      { favorite },
      { new: true }
    )
    if (!updateContact) {
      throw new NotFound()
    }
    res.status(200)
    res.json(updateContact)
  } catch (error) {
    next(error)
  }
}
module.exports = {
  updateStatusContact,
}
