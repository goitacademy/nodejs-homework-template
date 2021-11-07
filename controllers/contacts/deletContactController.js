const { NotFound } = require('http-errors')
const {Contact} = require('../../model')


const deleteContactController = async (req, res, next) => {
  try {
    const { contactId } = req.params
    const result = await Contact.findByIdAndRemove(contactId)
    if (!result) {
      throw new NotFound("Not found")
    }
    res.json({
      status: 'success',
      code: 200,
      message: "contact deleted"
    })
  } catch (error) {
    next()
  }
  res.json({ message: 'template message' })
}

module.exports = deleteContactController