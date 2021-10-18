const { Contact } = require('../../models/contact')

const getAll = async (req, res, next) => {
  const { page = 1, limit = 20 } = req.query
  const skip = (page - 1) * limit
  const result = await Contact.find({}, '_id, name , email , phone , owner', { skip, limit: +limit })
  res.json({
    status: 'success',
    code: 200,
    data: { result }
  })
}

module.exports = getAll
