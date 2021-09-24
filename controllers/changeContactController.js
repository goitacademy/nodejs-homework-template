const { changeContactModel } = require('../model')

const changeContactController = async (req, res, next) => {
  try {
    const bodyRequest = req.body
    const { contactId } = req.params
    const changedContact = await changeContactModel(contactId, bodyRequest)
    if (changedContact) {
      return res
        .json({ status: 'succsess', code: 200, data: changedContact })
    } else {
      throw new Error('404')
    }
  } catch (err) {
    next(err)
  }
}

module.exports = changeContactController
