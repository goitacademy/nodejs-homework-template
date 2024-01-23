import { getContactById } from '#models/contacts.js'

export async function showContacts(req, res, next) {
  try {
    const { contactId } = req.params
    const searchedContact = await getContactById(contactId)
    searchedContact
      ? res.status(200).json({ searchedContact })
      : res.status(404).json({
          message: `Not found contact with ID: ${contactId}`,
        })
  } catch (error) {
    next(error)
  }
}