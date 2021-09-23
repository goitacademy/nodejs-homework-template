const { User } = require('../../models')

const getAll = async (req, res) => {
  const { page = 1, limit = 2 } = req.query

  const skip = (page - 1) * limit
  const total = await User.estimatedDocumentCount()

  const result = await User.find({}, '', { skip, limit: +limit })

  res.json({
    status: 'success',
    code: 200,
    data: {
      total,
      pages: Math.ceil(total / limit),
      result,
    },
  })
}

module.exports = getAll
