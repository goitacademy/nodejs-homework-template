const { Contact } = require('../../model')

const listContacts = async (req, res, next) => {
  try {
    console.log(Contact)
    const contacts = await Contact.find()
    if (!contacts) {
      res.status(404).json({ message: 'not found' })
    }
    res.json({ contacts })
  } catch (error) {
    next(error)
  }
}

module.exports = listContacts
