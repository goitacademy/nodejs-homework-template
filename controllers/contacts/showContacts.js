import { getById } from '../handlers.js'

async function showContacts(req, res, next) {
  const contact = await getById(req.params.contactId);
  if (!contact) {
    return res.status(404).json({ message: "Not found" })
  } else {
    return res.status(200).json(contact)
  }
}

export { showContacts };