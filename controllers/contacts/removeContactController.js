const { removeContactModel } = require('../../model')

const removeContactController = async (req, res, next) => {
  try {
    const { contactId } = req.params
    await removeContactModel(contactId)
    return res
      .status(201)
      .json({ status: 'succsess', code: 200, message: 'contact deleted' })
  } catch (err) {
    next(err)
  }
}

module.exports = removeContactController
