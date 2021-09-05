const { Contact } = require('../../model')

const getAll = async (req, res, next) => {
  try {
    const contacts = await Contact.find({ owner: req.user._id }).populate('owner', '_id email subscription')
    res.json({
      status: 'success',
      code: 200,
      data: {
        result: contacts,
      }
    })
  } catch (error) {
    next(error)
  }
}

module.exports = getAll
