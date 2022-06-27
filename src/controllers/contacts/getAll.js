const { Contact } = require('../../../models')

const getList = async (req, res) => {
  const {page, limit} = req.query
  const data = await Contact.find({}, '', {skip: page, limit: limit})
  return res.json({ status: 'success', code: 200, contacts: data })
}

module.exports = getList
