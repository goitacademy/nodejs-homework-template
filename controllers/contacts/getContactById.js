// created by Irina Shushkevych
const { contactSchema } = require('../../models')


const getContactById = async (req, res, next) => {
  const { contactId } = req.params
  const { id } = req.user
  const data = await contactSchema.Contact.findOne({
    $and : [
      {_id: contactId }, 
      { owner: id }
    ]
  })

  if (!data) {
    return next({ id: contactId, status: 404 }) 
  }

  res.status(200).json({
    status: 'ok',
    code: 200,
    data,
  })
}

module.exports = getContactById
