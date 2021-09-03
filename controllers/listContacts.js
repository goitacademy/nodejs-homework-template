<<<<<<< HEAD
const contactsOperations = require('../model')

const listContacts = async (_, res, next) => {
  try {
    const contactsList = await contactsOperations.listContacts()
    res.json({ contactsList })
=======
const { Contact } = require('../model')

const listContacts = async (_, res, next) => {
  try {
    const contacts = await Contact.find({})

    res.json({ contacts })
>>>>>>> origin/hw-03-mongodb
  } catch (error) {
    next(error)
  }
}

module.exports = listContacts
