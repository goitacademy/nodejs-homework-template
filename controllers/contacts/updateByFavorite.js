const Contact = require('../../models/contact')
const { RequestError } = require('../../helpers')

const updateByFavorite = async (req, res, next) => {
  try {
    const { _id } = req.user
    const contactId = req.params.contactId
    const body = req.body
    if (body === null) {
      throw RequestError(400, "Missing fields")
    }
    const updateStatusContact = await Contact.findByIdAndUpdate({
      _id: contactId,
      owner: _id,
    }, body, { new: true })

    if (!updateStatusContact) {
      throw RequestError(404, "Not found")
    }

    res.json(updateStatusContact)
  } catch (error) {
    next(error)
  }
}

module.exports = updateByFavorite