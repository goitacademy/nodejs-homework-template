const Contact = require('../../models/contact')
const { RequestError } = require('../../helpers')

const updateById = async (req, res, next) => {
  try {
    const { _id } = req.user
    const contactId = req.params.contactId
    const body = req.body

    if (body === null) {
      throw RequestError(400, "Missing fields")
    }

    const contactUpdate = await Contact.findByIdAndUpdate({
      _id: contactId,
      owner: _id,
    }, body, { new: true })

    if (!contactUpdate) {
      throw RequestError(404, "Not found")
    }
    
    res.status(200).json(contactUpdate)
  } catch (error) {
    next(error)
  }
}

module.exports = updateById