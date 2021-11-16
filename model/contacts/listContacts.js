const {
  ContactModel
} = require('../../db/contactModel')

const listContacts = async (userId, pagination, favorite = null) => {
  if (!favorite) {

    const data = await ContactModel.find({
      owner: userId
    }, '', {
      skip: pagination.page,
      limit: pagination.limit
    })
    return data
  }
  const data = await ContactModel.find({
    owner: userId,
    favorite
  }, '', {
    skip: pagination.page,
    limit: pagination.limit
  })
  return data

}

module.exports = listContacts