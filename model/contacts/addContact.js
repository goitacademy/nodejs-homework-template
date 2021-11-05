const Contact = require('../../schemas/Contact')

const addContact = async (body) => {
  try {
    return await Contact.create(body)
  } catch (err) {
    console.log(err.message)
  }
}

module.exports = { addContact }
