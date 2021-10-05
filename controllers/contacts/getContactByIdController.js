const { getContactByIdModel } = require('../../model')

const getContactByIdController = async (req, res, next) => {
  try {
    const { contactId } = req.params
    const contact = await getContactByIdModel(contactId)
    return res
      .json({ status: 'succsess', code: 200, data: contact })
  } catch (err) {
    next(err)
  }
}

module.exports = getContactByIdController
