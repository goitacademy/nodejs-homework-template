const { Contact } = require('../../model')
// const { joiContactSchema } = require('../../model/contact')

const updateContact = async (req, res, next) => {
  try {
    const { id } = req.params
    const { body } = req
    if (!body) {
      return res.status(400).json({ message: 'missing fields' })
    }
    // const { error } = joiContactSchema.validate(body)
    // if (error) {
    //   return res.status(400).json({
    //     message: error.message
    //   })
    // }

    const updateContact = await Contact.findByIdAndUpdate({ _id: id }, body, { new: true })
    if (!updateContact) {
      return res.status(404).json({
        message: 'Not found'
      })
    }
    res.json({ updateContact })
  } catch (error) {
    next(error)
  }
}

module.exports = updateContact
