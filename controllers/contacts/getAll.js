const { Contact } = require('../../model')

const getAll = async (_, res, next) => {
  try {
    const { _id } = req.user
    const result = await Contact.find({ owner: _id })
    res.json(result)
  } catch (error) {
    next(error)
  }
}

module.exports = getAll
