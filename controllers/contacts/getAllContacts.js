const { Contact } = require('../../models')

const getAllContacts = async (req, res, next) => {
  try {
    const { page = 1, limit = 20 } = req.query
    if (Number.isNaN(page)) {
      res.status(400).json({
        status: 'Bad request',
        code: 400,
      })
    }
    if (Number.isNaN(limit)) {
      res.status(400).json({
        status: 'Bad request',
        code: 400,
      })
    }
    const skip = (+page - 1) * limit
    const { _id } = req.user
    const contacts = await Contact.find({ owner: _id },
      '_id name email phone favorite owner',
      { skip, limit: +limit }).populate('owner', '_id email')
    res.json({
      status: 'success',
      code: 200,
      data: { contacts },
    })
  } catch (error) {
    next(error)
  }
}

module.exports = getAllContacts
