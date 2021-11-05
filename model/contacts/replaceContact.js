const Contact = require('../../schemas/Contact')

const replaceContact = async (contactId, body) => {
  try {
    return await Contact.findOneAndReplace({ _id: contactId }, { ...body }, { returnDocument: 'after' })
  } catch (err) {
    console.log(err.message)
  }
}

module.exports = { replaceContact }
