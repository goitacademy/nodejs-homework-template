const CreateError = require('http-errors')
const { Contact } = require('../../model')

const selectedContact = async (req, res, next) => {
  try {
    const { contactId } = req.params
    const { favorite } = req.body
    const result = await Contact.findByIdAndUpdate(
      contactId,
      { favorite },
      {
        new: true,
      }
    )
    if (!result) {
      throw new CreateError(404, 'Not found')
    }
    res.json({
      status: 'success',
      code: 200,
      data: {
        result,
      },
    })
  } catch (error) {
    next(error)
  }
}

module.exports = selectedContact
