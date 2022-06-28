const { Contact } = require('../../../models')

const getList = async (req, res) => {
  const {page = 1, limit = 20, favorite} = req.query
  const skip = (page - 1)* limit

  const queryObject = favorite ? { favorite: favorite } : {}

  const data = await Contact.find(queryObject, '-__v', {skip, limit: Number(limit)}).sort('name')
  return res.json({ status: 'success', code: 200, contacts: data })
}

module.exports = getList
