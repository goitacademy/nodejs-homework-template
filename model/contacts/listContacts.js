const { ContactModel } = require('../../db/contactModel')

const listContacts = async (userId) => {
  const data = await ContactModel.find({owner: userId})
  return data
}

module.exports = listContacts
