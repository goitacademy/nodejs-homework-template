const handler = require('../handlers')

async function showContacts(req, res, next) {
  const contact = handler.getById(req.params.contactId);
  if (!contact) {
    return res.status(404).json({ message: "Not found" })
  } else {
    return res.status(200).json(contact)
  }
}

module.exports = showContacts;