const { listContactsModel } = require('../model')

const listContacts = async (req, res, next) => {
  try {
    const contacts = await listContactsModel()
    if (Object.keys(contacts).length) {
      return res
        .status(200)
        .json({ status: 'succsess', code: 201, data: { contacts } })
    } else {
      return res
        .json({ status: 'error', code: 500, message: 'Server error' })
    }
  } catch (err) {
    next(err)
  }
}

module.exports = listContacts
