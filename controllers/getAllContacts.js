const { Contact } = require('../model')

const getAllContacts = async (req, res) => {
  if (req.query.page && req.query.limit) {
    return null
  }
  let { page, limit } = req.query
  page = +page
  limit = +limit
  if (
    typeof page !== 'number' &&
    isNaN(page) &&
    typeof limit !== 'number' &&
    isNaN(limit)
  ) {
    return null
  }

  const skip = (page - 1) * limit
  const { _id } = req.user
  const contacts = await Contact.find(
    { owner: _id },
    '_id name email phone favorite owner',
    { skip, limit: limit }
  ).populate('owner', '_id email')
  res.json({
    status: 'success',
    code: 200,
    data: { contacts },
  })
}

module.exports = getAllContacts
