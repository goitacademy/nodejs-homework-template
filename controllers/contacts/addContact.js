// created by Irina Shushkevych
const { contactSchema } = require('../../models')


const addContact = async (req, res, next) => {
  const { id } = req.user
  const data = await contactSchema.Contact.create({
    ...req.body, 
    owner: id
  })
  res.status(201).json({
    status: 'created',
    code: 201,
    data,
  })
}

module.exports = addContact
