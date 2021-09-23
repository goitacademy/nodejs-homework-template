const { changeContactModel } = require('../model')

const changeContactController = async (req, res, next) => {
  try {
    const bodyRequest = req.body
    const { contactId } = req.params
    const changedContact = await changeContactModel(contactId, bodyRequest)
    if (changedContact) {
      return res
        .status(200)
        .json({ status: 'succsess', code: 200, data: changedContact })
    } else {
      return res
        .json({ status: 'error', code: 404, message: 'Not found' })
    }
  } catch (err) {
    next(err)
  }
}

module.exports = changeContactController
