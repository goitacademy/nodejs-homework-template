const data = require('../../model')

const getAll = async (req, res, next) => {
  try {
    const contacts = await data.listContacts()
    res.json({
      status: 'success',
      code: 200,
      data: {
        result: contacts,
      }
    })
  } catch (error) {
    next(error)
  }
}

module.exports = getAll
