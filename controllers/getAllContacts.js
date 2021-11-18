const { BadRequest } = require('http-errors')
const { Contact } = require('../model')

const getAllContacts = async (req, res) => {
  let { page = 1, limit = 20 } = req.query
  page = +page
  limit = +limit

  if (Number.isNaN(page)) {
    throw new BadRequest()
  }
  if (Number.isNaN(limit)) {
    throw new BadRequest()
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
