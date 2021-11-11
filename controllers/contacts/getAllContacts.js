const { listContacts } = require('../../model/contacts')

const getAllContacts = async (req, res, next) => {
  const owner = req.user._id
  const data = await listContacts(owner, req.query)
  res.json({
    status: 'success',
    code: 200,
    data: {
      result: data
    }
  })
}

module.exports = { getAllContacts }
