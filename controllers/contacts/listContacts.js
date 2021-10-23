const { Contact } = require('../../models')

const listContacts = async (req, res, _) => {
  const { page = 1, limit = 2 } = req.query
  const skip = (page - 1) * limit
  const pages = await Contact.find({ owner: req.user._id })
  const contacts = await Contact.find({ owner: req.user._id }, '', {
    skip,
    limit: +limit,
  }).populate('owner', '_id email')
  res.json({
    status: 'success',
    code: 200,
    data: {
      total: pages.length,
      pages: Math.ceil(pages.length / limit),
      contacts,
    },
  })
}

module.exports = listContacts
