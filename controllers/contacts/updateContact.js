// created by Irina Shushkevych
const { contactSchema } = require('../../models')


const updateContact = async (req, res, next) => {
  const { contactId } = req.params
  const { id } = req.user
  const data = await contactSchema.Contact.findOneAndUpdate(
    {
      $and : [
        {_id: contactId }, 
        { owner: id }
      ]
    },
    req.body,
    { new: true })
 
  if (!data){
    return next({ id: contactId, status: 404 })
  }

  res.status(200).json({
    status: 'ok',
    code: 200,
    data,
  })
}

module.exports = updateContact
