const { listContactsModel } = require('../../model')

const listContactsController = async (req, res, next) => {
  try {
    const contacts = await listContactsModel()
    return res
      .json({ status: 'succsess', code: 200, data: { contacts } })
  } catch (err) {
    next(err)
  }
}

module.exports = listContactsController
