const {
  ContactModel
} = require('../../db/contactModelMongoose')

const updateStatusContact = async (id, status) => {
  const data = await ContactModel.findByIdAndUpdate(id, {
    favorite: status
  })

  return data
}

module.exports = updateStatusContact
