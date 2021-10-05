const { listContactsModel } = require('../../model')

const listContactsController = async (req, res, next) => {
  try {
    const contacts = await listContactsModel()
    return res
      .status(200)
      .json({ status: 'succsess', code: 201, data: { contacts } })
  } catch (err) {
    next(err)
  }
}

module.exports = listContactsController
