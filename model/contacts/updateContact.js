const Contact = require('../../schemas/Contact')

const updateContact = async (contactId, body) => {
  try {
    return await Contact.findByIdAndUpdate(contactId, { ...body }, { returnDocument: 'after' })
  } catch (err) {
    console.log(err.message)
  }
}

module.exports = { updateContact }
