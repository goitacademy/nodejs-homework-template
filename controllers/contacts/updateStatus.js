const { Contact } = require('../../model')

const updateStatus = async (req, res, next) => {
  try {
    const { contactId } = req.params
    const { favorite } = req.body

    if (!favorite) {
      return res.status(400).json({
        message: 'missing field favorite'
      })
    }

    const updateContact = await Contact.findByIdAndUpdate(contactId, { favorite }, { new: true })
    
    if (!updateContact) {
      return res.status(404).json({
        message: 'Not found'
      })
    }

    res.status(200).json({
      status: 'success',
      code: 200,
      data: {
        result: updateContact
      }
    })
  } catch (error) {
    next(error)
  }
}

module.exports = updateStatus