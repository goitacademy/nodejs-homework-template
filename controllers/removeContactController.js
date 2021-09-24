const { removeContactModel } = require('../model')

const removeContactController = async (req, res, next) => {
  try {
    const { contactId } = req.params
    const contact = await removeContactModel(contactId)
    if (contact) {
      return res
        .status(201)
        .json({ status: 'succsess', code: 200, message: 'contact deleted' })
    } else {
      throw new Error('404')
    }
  } catch (err) {
    next(err)
  }
}

module.exports = removeContactController
