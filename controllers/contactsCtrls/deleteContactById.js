const { NotFound } = require('http-error')
const { Contact } = require('../../model/index')

const deleteContactById = async (req, res, next) => {
  try {
    console.log('file', req.file)
    const { contactId } = req.params
    const { _id } = req.user
    const deleteContact = await Contact.findOneAndRemove(contactId, {
      owner: _id,
    })
    // .findByIdAndRemove(contactId)

    if (!deleteContact) {
      throw new NotFound()
    }
    res.json({ message: 'contact deleted' })
  } catch (error) {
    next(error)
  }
}
module.exports = {
  deleteContactById,
}
