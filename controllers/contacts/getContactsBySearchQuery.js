const { Contact } = require('../../models/contact')
const { NotFound } = require('http-errors')

const getContactsBySearchQuery = async (req, res, next) => {
  const { _id } = req.user
  const query = req.query
  console.log('query :>> ', query)
  const result = await Contact.find({ ...query, owner: _id })
  if (!result) {
    throw new NotFound('No contacts with requested properties')
  }
  res.status(200).json({
    status: 'success',
    code: 200,
    data: {
      result
    }
  })
}

module.exports = getContactsBySearchQuery
