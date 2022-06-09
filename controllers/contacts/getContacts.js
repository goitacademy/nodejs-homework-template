const { Contact } = require('../../models')

module.exports = async (req, res, next) => {
  const { _id } = req.user
  const { page = 1, limit = 10 } = req.query
  const skip = (page - 1) * limit
  const contacts = await Contact.find({ owner: _id }, '', {
    skip,
    limit: Number(limit),
  }).populate('owner', '_id email')

  if (!contacts) {
    res.status(400).json({
      status: 'Error 400',
      message: `Bad request`,
    })
    return
  }
  res.json({ status: 'success', data: contacts })
}
