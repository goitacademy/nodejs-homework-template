const Contact = require('../../models/contact')
const { RequestError } = require('../RequestError')

const removeById = async (req, res, next) => {
  try {
    const { _id } = req.user
    const contactId = req.params.contactId
    const findContactById = await Contact.findByIdAndDelete({
      _id: contactId,
      owner: _id,
    })
    if (!findContactById) {
      throw RequestError(404, "Not found")
    }

    res.json({ message: "Contact deleted" })
  } catch (error) {
    next(error)
  }
}

module.exports = removeById