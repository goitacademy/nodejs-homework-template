// created by Irina Shushkevych
const { contactSchema } = require('../../models')


const updateContactFavorites = async (req, res, next) => {
  const { contactId } = req.params
  const { favorite } = req.body
  const data = await contactSchema.Contact.findByIdAndUpdate(contactId, { favorite }, { new: true })
 
  if (!data){
    return next({ id: contactId, status: 404 })

  }
  res.status(200).json({
    status: 'ok',
    code: 200,
    data,
  })
}

module.exports = updateContactFavorites
