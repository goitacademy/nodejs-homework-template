const { Contact } = require('../../model/index')

const getAll = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query
    const skip = (page - 1) * limit
    const { _id } = req.user
    const contacts = await Contact.find(
      { owner: _id },
      '-createdAt -updatedAt',
      {
        skip: skip,
        limit: +limit,
      }
    )
    res.json(contacts)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getAll,
}
