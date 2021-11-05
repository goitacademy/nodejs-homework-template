const Contact = require('../../schemas/Contact')

const listContacts = async () => {
  try {
    return await Contact.find()
  } catch (error) {
    console.log(error)
  }
}

module.exports = { listContacts }
