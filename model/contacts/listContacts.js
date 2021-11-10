const Contact = require('../../schemas/Contact')

const listContacts = async (owner) => {
  try {
    return await Contact.find({ owner }).populate('owner', '_id email')
  } catch (error) {
    console.log(error)
  }
}

module.exports = { listContacts }
