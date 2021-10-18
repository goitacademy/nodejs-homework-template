const { Contact } = require('../../models/contact')

const getAllByOwner = async (req, res, next) => {
  const { page = 1, limit = 10 } = req.query
  const skip = (page - 1) * limit
  const { _id } = req.user
  const result = await Contact.find({ owner: _id }, '_id, name , email , phone , owner', { skip, limit: +limit })
  res.json({
    status: 'success',
    code: 200,
    data: { result }
  })
}

module.exports = getAllByOwner
