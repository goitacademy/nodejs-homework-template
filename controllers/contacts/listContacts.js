const { Contact } = require('../../model')

const listContacts = async (_, res, next) => {
  try {
    const contacts = await Contact.find({ owner: _.user._id }).populate('owner', '_id email subscription')

    res.json({ contacts })
  } catch (error) {
    next(error)
  }
}

module.exports = listContacts
