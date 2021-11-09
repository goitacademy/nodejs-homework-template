const { ContactModel } = require('../../db/contactModelMongoose')

const updateContactById = async(id, data) => {
  const updatedContact = await ContactModel.findByIdAndUpdate(id, { $set: data })
  return updatedContact
}

module.exports = updateContactById
