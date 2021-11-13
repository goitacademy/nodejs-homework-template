const contactsOperation = require('../../model/index')
const getAll = async (_, res, next) => {
  try {
    const result = await contactsOperation.listContacts()
    res.json(result)
  } catch (error) {
    next(error)
  }
}

module.exports = getAll
