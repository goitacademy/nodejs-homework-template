const contactRepository = require('../repository/contacts')

const removeContact = async (req, res, next) => {
  try {
    const contacts = await contactRepository.removeContact(req.params.contactId)
  if (contacts) {
     return res.json({ status: 'success', code: 200, message: 'contact deleted', payload: {contacts} })
   }
   return res.status(404).json({status: 'error', code: 404, message: 'Not found'})
  } catch(err) {
    next(err)
  }
}

  module.exports = removeContact