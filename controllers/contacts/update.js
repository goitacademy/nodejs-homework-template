const { Contact } = require('../../model')

const update = async (req, res, next) => {
  try {
    // const { error } = joiContactSchema.validate(req.body)

    // if (error) {
    //   return res.status(400).json({
    //     message: error.message
    //   })
    // }

    const { contactId } = req.params
    const updateContact = await Contact.findByIdAndUpdate(contactId, req.body, {new: true})

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

module.exports = update
