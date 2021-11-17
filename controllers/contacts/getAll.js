const contactsOperations = require('../../models/index')

const getAll = async (req, res, next) => {
  try {
    const contactsAll = await contactsOperations.listContacts()
    res.json({
      status: 'success',
      code: 200,
      data: {
        contactsAll
      }
    })
  } catch (error) {
    next(error)
  }
}

module.exports = getAll
