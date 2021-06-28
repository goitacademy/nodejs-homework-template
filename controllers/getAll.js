const { jsonReader } = require('../utils')
const { listContacts } = jsonReader

const getAll = async (_, res, next) => {
  try {
    const contacts = await listContacts()
    res.json({
      status: 'success',
      code: 200,
      data: {
        result: contacts
      }
    })
  } catch (error) {
    next(error)
  }
}

module.exports = getAll
