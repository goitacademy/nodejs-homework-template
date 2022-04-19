const contactRepository = require('../repository/contacts')

const updateStatusContact = async (req, res, next) => {
  const contacts = await contactRepository.updateStatusContact(req.params.contactId, req.body)
  console.log(contacts);
  if (contacts) {
    return res.json({
      status: 'success', code: 200, payload: { contacts },
    })
  }
  return res.status(404).json({status: 'error', code: 404, message: 'Not Found',})
}

module.exports = updateStatusContact