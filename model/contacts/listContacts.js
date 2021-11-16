const { ContactModel } = require('../../db/contactModel')

const listContacts = async (userId, pagination) => {
  const data = await ContactModel.find({owner: userId}, '', {skip: pagination.page, limit: pagination.limit})
  return data
}

module.exports = listContacts
