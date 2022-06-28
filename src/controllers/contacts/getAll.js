const { Contact } = require('../../../models')

const getList = async (req, res) => {
  const {page = 1, limit = 10} = req.query
  const skip = (page - 1)* limit

  const data = await Contact.find({}, '', {skip, limit: Number(limit)})
  return res.json({ status: 'success', code: 200, contacts: data })
}

module.exports = getList
