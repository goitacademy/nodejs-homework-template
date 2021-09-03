const { Contact } = require('../model')

const listContacts = async (_, res, next) => {
  try {
    const contacts = await Contact.find({})

    res.json({ contacts })
  } catch (error) {
    next(error)
  }
}

module.exports = listContacts
