// created by Irina Shushkevych
const { getContacts } = require('../../models/contacts')

const listContacts = async (req, res, next) => {
  const data = await getContacts()
  res.status(200).json({
    status: 'ok',
    code: 200,
    data,
  })
}

module.exports = listContacts
