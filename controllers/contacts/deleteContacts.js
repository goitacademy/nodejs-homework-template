import { removeContact } from '#models/contacts.js'

export async function deleteContacts(req, res, next) {
  try {
    const { contactId } = req.params
    const contactToRemove = await removeContact(contactId)
    contactToRemove
      ? res.status(200).json({ message: 'Contact deleted' })
      : res.status(404).json({ message: 'Not found' })
  } catch (error) {
    next(error)
  }
}