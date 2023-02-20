const { Contact } = require('../../models/contact')

const listContacts = async (req, res) => {
  const { _id: owner } = req.user
  const { page = 1, limit = 10 } = req.query
  const skip = (page - 1) * limit
  const result = await Contact.find({ owner }, '-createdAt -updatedAt', {
    skip,
    limit,
  }).populate('owner', 'name email')
  res.json(result)
}
module.exports = listContacts

// 41:29, 49:21, 54:27
// https://www.youtube.com/watch?v=e_ZQX6V7P0Y
