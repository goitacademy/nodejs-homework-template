// created by Irina Shushkevych
const { getContacts } = require('../../models/contacts')

const getContactById = async (req, res, next) => {
  const { contactId } = req.params
  const data = await getContacts()

  const response = data.find((el) => el.id === contactId)
  if (!response) {
    res.locals.id = contactId
    res.locals.code = 404
    next()
    return
  }

  res.status(200).json({
    status: 'ok',
    code: 200,
    data: response,
  })
}

module.exports = getContactById
