const { ContactModel } = require('../../db/contactModelMongoose')

const getContactById = async (contactId) => {
  const neededContact = await ContactModel.findOne({
    _id: contactId
  })

  if (!neededContact) {
    return null
  }
  return neededContact
}

module.exports = getContactById
