const { Contact } = require('../../model')

const getAll = async (req, res, next) => {
  const { page, limit } = req.query
  const skip = (page - 1) * limit
  try {
    const { _id } = req.user
    const result = await Contact.find(
      { owner: _id },
      '_id name email phone favorite owner',
      { skip, limit: +limit }
    ).populate('owner', '_id email')
    res.json(result)
  } catch (error) {
    next(error)
  }
}

module.exports = getAll
