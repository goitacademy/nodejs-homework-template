const { getContactByIdModel } = require('../model')

const getContactByIdController = async (req, res, next) => {
  try {
    const { contactId } = req.params
    const contact = getContactByIdModel(contactId)
    if (contact) {
      return res
        .status(201)
        .json({ status: 'succsess', code: 200, data: { contact } })
    } else {
      return res
        .status(404)
        .json({ status: 'error', code: 404, message: 'Not found' })
    }
  } catch (err) {
    next(err)
  }
}

module.exports = getContactByIdController
