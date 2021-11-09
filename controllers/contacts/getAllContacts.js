const { listContacts } = require('../../model/contacts')

const getAllContacts = async (req, res, next) => {
  const data = await listContacts()
  res.json({
    status: 'success',
    code: 200,
    data: {
      result: data
    }
  })
}

module.exports = { getAllContacts }
