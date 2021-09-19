const { Contact } = require('../../models')

const getAll = async (req, res) => {
  const { page = 1, limit = 2 } = req.query

  const skip = (page - 1) * limit
  const total = await Contact.estimatedDocumentCount()

  const result = await Contact.find({}, '', { skip, limit: +limit })

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
