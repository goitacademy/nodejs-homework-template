const { ContactModel } = require('../../db/contactModelMongoose')

const listContacts = async () => {
  const data = await ContactModel.find()
  return data
}

module.exports = listContacts
