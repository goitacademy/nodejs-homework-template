const { updateStatusContactModel } = require('../../model')

const updateStatusContactController = async (req, res, next) => {
  try {
    const { favorite } = req.body
    const { contactId } = req.params
    const changedContact = await updateStatusContactModel(contactId, favorite)
    return res
      .json({ status: 'succsess', code: 200, data: changedContact })
  } catch (err) {
    next(err)
  }
}

module.exports = updateStatusContactController
