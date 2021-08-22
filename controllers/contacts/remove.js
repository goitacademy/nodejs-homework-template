const data = require('../../model')

const remove = async (req, res, next) => {
  try {
    const { contactId } = req.params
    const deleteContact = await data.removeContact(contactId)

    if (!deleteContact) {
      return res.status(404).json({
        message: 'Not found'
      })
    }

    res.status(200).json({
      status: 'success',
      code: 200,
      message: 'Contact deleted',
      data: {
        result: deleteContact,
      }
    })
  } catch (error) {
    next(error)
  }
}

module.exports = remove
