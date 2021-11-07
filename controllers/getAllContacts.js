const { listContacts } = require('../model/index')

const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await listContacts()
    res.json({
      status: 'success',
      code: 200,
      data: { contacts },
    })
  } catch (error) {
    next(error)
  }
}

module.exports = getAllContacts
