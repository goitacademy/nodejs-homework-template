const contactsOperations = require('../../model/contacts')

const getList = async (req, res, next) => {
  try {
    const contacts = await contactsOperations.listContacts()
    res.status(200).json({
      status: 'OK',
      code: 200,
      data: { contacts }
    })
  } catch (error) {
    next(error)
  }
}

module.exports = getList
