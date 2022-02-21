// created by Irina Shushkevych
const { contactSchema } = require('../../models')

const listContacts = async (req, res, next) => {
  const data = await contactSchema.Contact.find({})
  res.status(200).json({
    status: 'ok',
    code: 200,
    data,
  })
}

module.exports = listContacts
