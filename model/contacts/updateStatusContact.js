const {
  ContactModel
} = require('../../db/contactModel')

const updateStatusContact = async (id, status) => {
  const data = await ContactModel.findByIdAndUpdate(id, {
    favorite: status
  })

  return data
}

module.exports = updateStatusContact
