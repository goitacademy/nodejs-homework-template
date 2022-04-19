const contactRepository = require('../repository/contacts')

const getContactById = async (req, res, next) => {
   const contacts = await contactRepository.getContactById(req.params.contactId)
   if (contacts) {
     return res.json({ status: 'success', code: 200, payload: {contacts} })
   }
   return res.status(404).json({status: 'error', code: 404, message: 'Not Faund'})
}
module.exports = getContactById