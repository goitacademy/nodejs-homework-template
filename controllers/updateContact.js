const contactRepository = require('../repository/contacts')

const updateContact = async (req, res, next) => {
   const contacts = await contactRepository.updateContact(req.params.contactId, req.body)
   if (contacts) {
     return res.json({ status: 'success', code: 200, payload: {contacts} })
   }
   return res.status(404).json({status: 'error', code: 404, message: 'Not found'})
}

module.exports = updateContact