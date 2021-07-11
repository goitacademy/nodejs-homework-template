const { contacts: service } = require('../../services')

const listContacts = async (req, res, next) => {
  try {
    const result = await service.getAll()
    return res.json({
      status: 'success',
      code: 200,
      data: {
        result
      },
    })
  } catch (error) {
    next(error)
  }
}

module.exports = listContacts
