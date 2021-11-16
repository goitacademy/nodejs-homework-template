const { ContactModel } = require('../../db/contactModel')

const updateContactById = async(id, data) => {
  const updatedContact = await ContactModel.findByIdAndUpdate(id, { $set: data })
  return updatedContact
}

module.exports = updateContactById
